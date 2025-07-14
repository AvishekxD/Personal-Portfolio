"use client";

import HeatMap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
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
                        (value as HeatmapValue)?.count
                            ? `heatmap-level-${Math.min((value as HeatmapValue).count, 4)}`
                            : "heatmap-level-0"
                    }
                    tooltipDataAttrs={(value: ReactCalendarHeatmapValue<string> | undefined): Record<string, string> => {
                        const date = value?.date ?? "N/A";
                        const count = (value as HeatmapValue)?.count ?? 0;
                        return {
                            "data-tooltip-id": "heatmap-tooltip",
                            "data-tooltip-content": `${date} — ${count} contributions`,
                        };
                    }}
                />
            </div>
        </div>
    );
}
