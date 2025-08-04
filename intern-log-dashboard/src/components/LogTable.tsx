import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternshipLog } from "@/types/internship";
import { formatDate } from "@/utils/dateUtils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LogTableProps {
  logs: InternshipLog[];
}

export function LogTable({ logs }: LogTableProps) {
  const getHoursColor = (hours: number) => {
    if (hours > 3) return "text-success";
    if (hours < 2) return "text-destructive";
    return "text-foreground";
  };

  const getHoursBadgeVariant = (hours: number) => {
    if (hours > 3) return "default";
    if (hours < 2) return "destructive";
    return "secondary";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Research": "bg-info/10 text-info border-info/20",
      "Design": "bg-chart-4/10 text-chart-4 border-chart-4/20",
      "Communication": "bg-warning/10 text-warning border-warning/20",
      "Coding": "bg-chart-1/10 text-chart-1 border-chart-1/20",
      "Testing": "bg-destructive/10 text-destructive border-destructive/20",
      "Documentation": "bg-success/10 text-success border-success/20"
    };
    return colors[category as keyof typeof colors] || "bg-muted/10 text-muted-foreground border-muted/20";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internship Log Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Week #</TableHead>
                <TableHead className="font-bold">Task Description</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Hours</TableHead>
                <TableHead className="font-bold">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow 
                  key={log.id} 
                  className={cn(
                    index % 2 === 0 ? "bg-background" : "bg-muted/20",
                    "hover:bg-muted/30 transition-colors"
                  )}
                >
                  <TableCell className="font-medium">{log.name}</TableCell>
                  <TableCell>{formatDate(log.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.weekNumber}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={log.taskDescription}>
                      {log.taskDescription}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(log.category)}>
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getHoursBadgeVariant(log.hoursWorked)}
                      className={cn("font-mono", getHoursColor(log.hoursWorked))}
                    >
                      {log.hoursWorked}h
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-muted-foreground" title={log.notes}>
                      {log.notes || "-"}
                    </div>
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