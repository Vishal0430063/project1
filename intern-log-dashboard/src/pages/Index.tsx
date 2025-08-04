import { useState, useMemo } from "react";
import { InternshipLog, KPIData } from "@/types/internship";
import { sampleLogs } from "@/data/sampleData";
import { KPICard } from "@/components/KPICard";
import { LogEntryForm } from "@/components/LogEntryForm";
import { LogTable } from "@/components/LogTable";
import { Charts } from "@/components/Charts";
import { Filters } from "@/components/Filters";
import { WeeklySummaryTable } from "@/components/WeeklySummaryTable";
import { ClipboardList, Users, Calendar, BarChart3 } from "lucide-react";

const Index = () => {
  const [logs, setLogs] = useState<InternshipLog[]>(sampleLogs);
  const [selectedWeek, setSelectedWeek] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIntern, setSelectedIntern] = useState<string>("all");

  // Filter logs based on selected filters
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (selectedWeek !== "all" && log.weekNumber.toString() !== selectedWeek) return false;
      if (selectedCategory !== "all" && log.category !== selectedCategory) return false;
      if (selectedIntern !== "all" && log.name !== selectedIntern) return false;
      return true;
    });
  }, [logs, selectedWeek, selectedCategory, selectedIntern]);

  // Calculate KPIs
  const kpiData = useMemo((): KPIData => {
    const totalHours = filteredLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
    const uniqueDates = new Set(filteredLogs.map(log => log.date));
    const totalDays = uniqueDates.size;
    const maxHoursInOneDay = filteredLogs.reduce((acc, log) => {
      const dayTotal = filteredLogs
        .filter(l => l.date === log.date)
        .reduce((sum, l) => sum + l.hoursWorked, 0);
      return Math.max(acc, dayTotal);
    }, 0);

    return {
      totalHours: Number(totalHours.toFixed(1)),
      averageHoursPerDay: totalDays > 0 ? Number((totalHours / totalDays).toFixed(1)) : 0,
      maxHoursInOneDay: Number(maxHoursInOneDay.toFixed(1)),
      totalDays
    };
  }, [filteredLogs]);

  const handleAddLog = (newLog: InternshipLog) => {
    setLogs(prev => [...prev, newLog]);
  };

  const handleClearFilters = () => {
    setSelectedWeek("all");
    setSelectedCategory("all");
    setSelectedIntern("all");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Internship Log Dashboard</h1>
              <p className="text-muted-foreground">Track daily activities and weekly progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Hours Logged"
            value={kpiData.totalHours}
            subtitle="across all activities"
            variant="info"
          />
          <KPICard
            title="Average Hours Per Day"
            value={kpiData.averageHoursPerDay}
            subtitle={`over ${kpiData.totalDays} days`}
            variant="default"
          />
          <KPICard
            title="Maximum Hours in One Day"
            value={kpiData.maxHoursInOneDay}
            subtitle="peak productivity"
            variant="success"
          />
          <KPICard
            title="Active Interns"
            value={new Set(filteredLogs.map(log => log.name)).size}
            subtitle="currently logging hours"
            variant="warning"
          />
        </div>

        {/* Filters */}
        <Filters
          logs={logs}
          selectedWeek={selectedWeek}
          selectedCategory={selectedCategory}
          selectedIntern={selectedIntern}
          onWeekChange={setSelectedWeek}
          onCategoryChange={setSelectedCategory}
          onInternChange={setSelectedIntern}
          onClearFilters={handleClearFilters}
        />

        {/* Charts */}
        <Charts logs={filteredLogs} />

        {/* Weekly Summary Table */}
        <WeeklySummaryTable logs={filteredLogs} />

        {/* Add New Entry Form */}
        <LogEntryForm onAddLog={handleAddLog} />

        {/* Log Table */}
        <LogTable logs={filteredLogs} />
      </div>
    </div>
  );
};

export default Index;
