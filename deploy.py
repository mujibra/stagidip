#!/usr/bin/env python3
import os
import sys
import subprocess
import json
import boto3
import zipfile
import shutil
from datetime import datetime
import secrets
import string
import time
from pathlib import Path
import argparse

class developmentDeployer:
    def __init__(self, non_interactive=False):
        # --- DEVELOPMENT CONFIGURATION ---
        # Fill these values for your development environment
        self.app_name = "stagidip-dev"
        self.env_name = "stagidip-env2"
        self.region = "ap-southeast-3"
        self.solution_stack = "64bit Amazon Linux 2023 v6.6.4 running Node.js 22" # Find the latest from AWS docs
        
        # Development VPC and Networking
        self.vpc_id = "vpc-007ff08f988fc82b5" # Your Development VPC ID
        self.elb_subnets = "subnet-00dbbbd624e6f2ec6,subnet-0237cad1dc9fa43a0,subnet-0c0031c639ea9718a" # Comma-separated public subnets for Load Balancer
        self.instance_subnets = "subnet-074496d973f2f8eab,subnet-0e42907e53f652990,subnet-0f6360617a08eb7ca" # Comma-separated private subnets for Instances
        
        # Development EC2 and Security
        self.instance_type = "t3.small"
        self.iam_instance_profile = "aws-elasticbeanstalk-ec2-role" # Usually this is the default
        self.security_groups = "sg-0dfd3ebf560bd868e" # Your Development App's Security Group
        self.ec2_key_name = "mydatindo-vpn-dev"
        # --- END OF CONFIGURATION ---

        self.project_path = Path(__file__).resolve().parent
        self.env_file_path = self.project_path / ".env.local"
        self.non_interactive = non_interactive
        self.env_vars = {}

    def load_env_file(self):
        """Load environment variables from .env.local file"""
        print(f"📋 Loading environment variables from {self.env_file_path}...")
        if not self.env_file_path.exists():
            print(f"❌ CRITICAL: development environment file '{self.env_file_path}' not found.")
            print("   Please create it with your development secrets before deploying.")
            return False

        with open(self.env_file_path) as f:
            for line in f:
                line = line.strip()
                if '=' in line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    if key and value:
                        self.env_vars[key] = value
        
        print("✅ Loaded environment variables for deployment.")
        return True

    def check_prerequisites(self):
        """Check for necessary files for an on-server build."""
        print("\n🔍 Checking prerequisites for on-server build...")
        # For an on-server build, we check for source code, not the .next directory.
        if not (self.project_path / "app").exists():
            print("❌ 'app' directory not found. Cannot create a valid source bundle.")
            return False
            
        if not (self.project_path / "package.json").exists():
            print("❌ 'package.json' not found.")
            return False
            
        print("✅ Prerequisites met.")
        return True

    def prepare_package_for_on_server_build(self):
        """Creates a zip file containing the source code for an on-server build."""
        print("\n📦 Creating source code deployment package...")
        output_path = self.project_path / 'eb-dev-deploy.zip'
        
        # Items to IGNORE in the zip file
        ignore_list = {'.git', 'node_modules', 'docs' 'deploy.py', 'deploy_production.py', 'README.md', 'src', str(output_path.name), '.env.local', '.env.production'}

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(self.project_path):
                # Modify dirs in-place to prevent walking into ignored directories
                dirs[:] = [d for d in dirs if d not in ignore_list]
                
                for file in files:
                    if file not in ignore_list:
                        file_path = Path(root) / file
                        arcname = file_path.relative_to(self.project_path)
                        zipf.write(file_path, arcname)
                        
        print(f"✅ Package created: {output_path}")
        return str(output_path)

    def get_eb_env_options(self):
        """Prepares all environment variables from the .env.local file."""
        print("   Registering environment variables on Elastic Beanstalk...")
        option_settings = [
            {'Namespace': 'aws:elasticbeanstalk:environment', 'OptionName': 'EnvironmentType', 'Value': 'LoadBalanced'},
            {'Namespace': 'aws:elasticbeanstalk:environment:process:default', 'OptionName': 'HealthCheckPath', 'Value': '/api/health'},
            {'Namespace': 'aws:ec2:vpc', 'OptionName': 'VPCId', 'Value': self.vpc_id},
            {'Namespace': 'aws:ec2:vpc', 'OptionName': 'ELBSubnets', 'Value': self.elb_subnets},
            {'Namespace': 'aws:ec2:vpc', 'OptionName': 'Subnets', 'Value': self.instance_subnets},
            {'Namespace': 'aws:autoscaling:launchconfiguration', 'OptionName': 'InstanceType', 'Value': self.instance_type},
            {'Namespace': 'aws:autoscaling:launchconfiguration', 'OptionName': 'EC2KeyName', 'Value': self.ec2_key_name},
            {'Namespace': 'aws:autoscaling:launchconfiguration', 'OptionName': 'IamInstanceProfile', 'Value': self.iam_instance_profile},
            {'Namespace': 'aws:autoscaling:launchconfiguration', 'OptionName': 'SecurityGroups', 'Value': self.security_groups},
        ]
        
        # Add all variables from .env.local
        for key, value in self.env_vars.items():
            option_settings.append({
                'Namespace': 'aws:elasticbeanstalk:application:environment',
                'OptionName': key,
                'Value': value
            })
        
        print(f"   Added {len(self.env_vars)} variables to the environment configuration.")
        return option_settings

    def update_env_vars_only(self):
        """Update only environment variables without deploying new code."""
        eb = boto3.client('elasticbeanstalk', region_name=self.region)
        option_settings = self.get_eb_env_options()

        print(f"\n📌 Updating environment variables for '{self.env_name}'...")
        eb.update_environment(
            ApplicationName=self.app_name,
            EnvironmentName=self.env_name,
            OptionSettings=option_settings
        )
        waiter = eb.get_waiter('environment_updated')
        print("⏳ Waiting for env vars update to complete...")
        waiter.wait(EnvironmentNames=[self.env_name], WaiterConfig={'Delay': 30, 'MaxAttempts': 40})
        print("✅ Environment variables updated successfully!")

    def deploy(self):
        """Main deployment workflow."""
        print(f"\n🚀 Deploying '{self.app_name}' to development environment '{self.env_name}'...")
        
        eb = boto3.client('elasticbeanstalk', region_name=self.region)
        s3 = boto3.client('s3', region_name=self.region)
        
        # 1. Prepare package
        package_path = self.prepare_package_for_on_server_build()
        
        # 2. Upload to S3
        bucket_name = f"{self.app_name}-deployments-{self.region}"
        try:
            if self.region == 'us-east-1':
                s3.create_bucket(Bucket=bucket_name)
            else:
                s3.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={'LocationConstraint': self.region})
            print(f"✅ Created S3 bucket: {bucket_name}")
        except s3.exceptions.BucketAlreadyOwnedByYou:
            print(f"ℹ️ S3 bucket '{bucket_name}' already exists.")
        
        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
        version_label = f"v-{timestamp}"
        s3_key = f"{self.app_name}/{version_label}.zip"
        
        print(f"   Uploading {package_path} to s3://{bucket_name}/{s3_key}...")
        s3.upload_file(package_path, bucket_name, s3_key)
        print("✅ Uploaded to S3.")
        
        # 3. Create Application Version
        print(f"   Creating application version: {version_label}...")
        eb.create_application_version(
            ApplicationName=self.app_name,
            VersionLabel=version_label,
            SourceBundle={'S3Bucket': bucket_name, 'S3Key': s3_key},
            Process=True # Let EB validate the package
        )
        print(f"✅ Created version: {version_label}")

        # --- [NEW] Wait for Application Version to be processed ---
        print("⏳ Waiting for application version to be processed...")
        max_attempts = 20  # Wait for a maximum of 20 * 5 = 100 seconds
        for i in range(max_attempts):
            response = eb.describe_application_versions(
                ApplicationName=self.app_name,
                VersionLabels=[version_label]
            )
            version_info = response['ApplicationVersions'][0]
            status = version_info.get('Status')
            print(f"   Attempt {i+1}/{max_attempts}: Version status is '{status}'")

            if status == 'PROCESSED':
                print("✅ Version processed successfully.")
                break
            elif status == 'FAILED':
                raise Exception("Application version processing failed. Check the EB console for details.")
            
            time.sleep(5) # Wait 5 seconds before checking again
        else:
            raise Exception("Timeout: Application version processing took too long.")
        # --- End of new code ---

        # 4. Get environment options
        option_settings = self.get_eb_env_options()

        # 5. Update or Create Environment
        print("   Checking for existing environment...")
        response = eb.describe_environments(ApplicationName=self.app_name, EnvironmentNames=[self.env_name])
        env_exists = len(response['Environments']) > 0 and response['Environments'][0]['Status'] != 'Terminated'

        if env_exists:
            print("📌 Updating existing environment...")
            eb.update_environment(
                ApplicationName=self.app_name,
                EnvironmentName=self.env_name,
                VersionLabel=version_label,
                OptionSettings=option_settings
            )
            waiter = eb.get_waiter('environment_updated')
            print("⏳ Waiting for update to complete (this can take several minutes)...")
            waiter.wait(EnvironmentNames=[self.env_name], WaiterConfig={'Delay': 30, 'MaxAttempts': 40})

        else:
            print("📌 Creating new environment (this can take 10-15 minutes)...")
            eb.create_environment(
                ApplicationName=self.app_name,
                EnvironmentName=self.env_name,
                VersionLabel=version_label,
                SolutionStackName=self.solution_stack,
                OptionSettings=option_settings
            )
            waiter = eb.get_waiter('environment_exists')
            print("⏳ Waiting for environment to become available...")
            waiter.wait(EnvironmentNames=[self.env_name], WaiterConfig={'Delay': 30, 'MaxAttempts': 40})

        print(f"\n✅ Deployment to '{self.env_name}' completed successfully!")
        
        # Final cleanup
        os.remove(package_path)

    def run(self):
        print("🚀 StagiDip - DEVELOPMENT Deployment Script")
        print("=" * 50)
        
        if not self.load_env_file():
            sys.exit(1)

        if args.env_only:
            try:
                self.update_env_vars_only()
                print("\n🎉 Environment variables synced successfully!")
            except Exception as e:
                print(f"\n❌ ENV VAR UPDATE FAILED: {e}")
                sys.exit(1)
            return  # ✅ Skip full deploy if env-only flag is set

        if not self.check_prerequisites():
            sys.exit(1)

        print("\n📋 Deployment Summary:")
        print(f"   Application: {self.app_name}")
        print(f"   Environment: {self.env_name}")
        print(f"   Region:      {self.region}")
        print(f"   VPC ID:      {self.vpc_id}")
        
        if not self.non_interactive:
            confirm = input("\n❓ This will deploy to DEVELOPMENT. Continue? (y/n): ")
            if confirm.lower() != 'y':
                print("❌ Deployment cancelled.")
                return

        try:
            self.deploy()
            print("\n🎉 development deployment successful!")
        except Exception as e:
            print(f"\n❌ DEPLOYMENT FAILED: {e}")
            sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="development deployment script for stagiDip.")
    parser.add_argument("-y", "--yes", action="store_true", help="Bypass interactive confirmation for automated execution.")
    parser.add_argument("--env-only", action="store_true", help="Update only environment variables without deploying code.")
    args = parser.parse_args()
    
    deployer = developmentDeployer(non_interactive=args.yes)
    deployer.run()