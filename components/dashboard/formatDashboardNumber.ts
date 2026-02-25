const dashboardNumberFormatter = new Intl.NumberFormat("id-ID");

export default function formatDashboardNumber(value: number) {
    return dashboardNumberFormatter.format(value);
}
