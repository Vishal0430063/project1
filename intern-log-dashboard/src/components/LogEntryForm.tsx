import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InternshipLog, TASK_CATEGORIES, TaskCategory } from "@/types/internship";
import { getWeekNumber } from "@/utils/dateUtils";
import { Plus } from "lucide-react";

interface LogEntryFormProps {
  onAddLog: (log: InternshipLog) => void;
}

export function LogEntryForm({ onAddLog }: LogEntryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    taskDescription: "",
    category: "" as TaskCategory,
    hoursWorked: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.taskDescription || !formData.category || !formData.hoursWorked) {
      return;
    }

    const newLog: InternshipLog = {
      id: Date.now().toString(),
      name: formData.name,
      date: formData.date,
      taskDescription: formData.taskDescription,
      category: formData.category,
      hoursWorked: parseFloat(formData.hoursWorked),
      notes: formData.notes,
      weekNumber: getWeekNumber(formData.date)
    };

    onAddLog(newLog);
    setFormData({
      name: "",
      date: "",
      taskDescription: "",
      category: "" as TaskCategory,
      hoursWorked: "",
      notes: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Log Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Intern Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter intern name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task">Task Description</Label>
            <Input
              id="task"
              value={formData.taskDescription}
              onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
              placeholder="Describe the task performed"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: TaskCategory) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours Worked</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={formData.hoursWorked}
                onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                placeholder="0.0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or comments"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Log Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}