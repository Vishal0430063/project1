import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InternshipLog } from "@/types/internship";
import { cn } from "@/lib/utils";

interface WeeklySummaryTableProps {
  logs: InternshipLog[];
}

export function WeeklySummaryTable({ logs }: WeeklySummaryTableProps) {
  // Calculate weekly summary data (pivot table equivalent)
  const summaryData = logs.reduce((acc, log) => {
    const key = `${log.name}-${log.weekNumber}`;
    if (!acc[key]) {
      acc[key] = {
        intern: log.name,
        week: log.weekNumber,
        totalHours: 0,
        dayCount: 0,
        dates: new Set()
      };
    }
    acc[key].totalHours += log.hoursWorked;
    acc[key].dates.add(log.date);
    return acc;
  }, {} as Record<string, any>);

  const summaryArray = Object.values(summaryData).map((item: any) => ({
    intern: item.intern,
    week: item.week,
    totalHours: Number(item.totalHours.toFixed(1)),
    dayCount: item.dates.size
  })).sort((a, b) => {
    if (a.week !== b.week) return a.week - b.week;
    return a.intern.localeCompare(b.intern);
  });

  const getHoursColor = (hours: number) => {
    if (hours >= 30) return "text-success";
    if (hours >= 20) return "text-info";
    if (hours >= 10) return "text-warning";
    return "text-muted-foreground";
  };

  const getHoursBadgeVariant = (hours: number) => {
    if (hours >= 30) return "default";
    if (hours >= 20) return "secondary";
    return "outline";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Summary by Intern</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Intern Name</TableHead>
                <TableHead className="font-bold">Week Number</TableHead>
                <TableHead className="font-bold">Total Hours</TableHead>
                <TableHead className="font-bold">Days Worked</TableHead>
                <TableHead className="font-bold">Avg Hours/Day</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryArray.map((row, index) => (
                <TableRow 
                  key={`${row.intern}-${row.week}`}
                  className={cn(
                    index % 2 === 0 ? "bg-background" : "bg-muted/20",
                    "hover:bg-muted/30 transition-colors"
                  )}
                >
                  <TableCell className="font-medium">{row.intern}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Week {row.week}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getHoursBadgeVariant(row.totalHours)}
                      className={cn("font-mono", getHoursColor(row.totalHours))}
                    >
                      {row.totalHours}h
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {row.dayCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {(row.totalHours / row.dayCount).toFixed(1)}h
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}