import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { InternshipLog, WeeklySummary, CategorySummary } from "@/types/internship";

interface ChartsProps {
  logs: InternshipLog[];
}

export function Charts({ logs }: ChartsProps) {
  // Calculate weekly data
  const weeklyData = logs.reduce((acc, log) => {
    const key = `Week ${log.weekNumber}`;
    acc[key] = (acc[key] || 0) + log.hoursWorked;
    return acc;
  }, {} as Record<string, number>);

  const weeklyChartData = Object.entries(weeklyData).map(([week, hours]) => ({
    week,
    hours: Number(hours.toFixed(1))
  }));

  // Calculate category data
  const categoryData = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + log.hoursWorked;
    return acc;
  }, {} as Record<string, number>);

  const totalHours = Object.values(categoryData).reduce((sum, hours) => sum + hours, 0);
  const categoryChartData = Object.entries(categoryData).map(([category, hours]) => ({
    category,
    hours: Number(hours.toFixed(1)),
    percentage: Number(((hours / totalHours) * 100).toFixed(1))
  }));

  const CHART_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Hours Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Hours by Week</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="week" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Hours"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Time Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="hours"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[index % CHART_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
                formatter={(value: any, name: any) => [`${value}h`, "Hours"]}
              />
              <Legend 
                wrapperStyle={{ fontSize: "12px" }}
                iconType="rect"
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}