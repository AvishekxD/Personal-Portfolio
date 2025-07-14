"use client";

import HeatMap from "react-calendar-heatmap";
import { format, subDays } from "date-fns";
import "react-calendar-heatmap/dist/styles.css";

interface HeatmapValue {
    date: string;
    count: number; 
}

interface HeatmapCalendarProps {
    values: HeatmapValue[]; 
}

export default function HeatmapCalendar({ values }: HeatmapCalendarProps) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[600px]">
                <HeatMap
                    startDate={subDays(new Date(), 365)}
                    endDate={new Date()}
                    values={values}
                    showWeekdayLabels={false}
                    classForValue={(value) =>
                        value?.count ? `heatmap-level-${Math.min(value.count, 4)}` : "heatmap-level-0"
                    }
                    tooltipDataAttrs={(value: any) => {
                        return {
                            "data-tooltip-id": "heatmap-tooltip",
                            "data-tooltip-content": `${value?.date ?? "N/A"} — ${value?.count ?? 0} contributions`
                        } as { [key: string]: string };
                    }}
                />
            </div>
        </div>
    );
}
