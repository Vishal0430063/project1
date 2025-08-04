import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InternshipLog, TASK_CATEGORIES, TaskCategory } from "@/types/internship";
import { Filter, X } from "lucide-react";

interface FiltersProps {
  logs: InternshipLog[];
  selectedWeek: string;
  selectedCategory: string;
  selectedIntern: string;
  onWeekChange: (week: string) => void;
  onCategoryChange: (category: string) => void;
  onInternChange: (intern: string) => void;
  onClearFilters: () => void;
}

export function Filters({
  logs,
  selectedWeek,
  selectedCategory,
  selectedIntern,
  onWeekChange,
  onCategoryChange,
  onInternChange,
  onClearFilters
}: FiltersProps) {
  // Get unique values for filters
  const uniqueWeeks = [...new Set(logs.map(log => log.weekNumber))].sort((a, b) => a - b);
  const uniqueInterns = [...new Set(logs.map(log => log.name))].sort();
  
  const hasActiveFilters = selectedWeek !== "all" || selectedCategory !== "all" || selectedIntern !== "all";
  const activeFilterCount = [selectedWeek, selectedCategory, selectedIntern].filter(f => f !== "all").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearFilters}
              className="h-8"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Week Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Week Number</label>
            <Select value={selectedWeek} onValueChange={onWeekChange}>
              <SelectTrigger>
                <SelectValue placeholder="All weeks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weeks</SelectItem>
                {uniqueWeeks.map(week => (
                  <SelectItem key={week} value={week.toString()}>
                    Week {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {TASK_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intern Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Intern</label>
            <Select value={selectedIntern} onValueChange={onInternChange}>
              <SelectTrigger>
                <SelectValue placeholder="All interns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interns</SelectItem>
                {uniqueInterns.map(intern => (
                  <SelectItem key={intern} value={intern}>
                    {intern}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}