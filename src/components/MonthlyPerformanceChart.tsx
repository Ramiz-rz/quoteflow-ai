import { useState, useId } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { MonthlyPerformanceRecord, Quote } from '../types';
import { getMonthlyPerformance } from '../data/analyticsData';

interface MonthlyPerformanceChartProps {
  quotes: Quote[];
  onShowToast?: (msg: string, icon?: string) => void;
}

type ChartMode = 'combined' | 'value' | 'winRate';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: MonthlyPerformanceRecord;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-surface-container-high border border-outline-variant/40 rounded-xl p-3 shadow-2xl space-y-1.5 font-mono text-[12px] min-w-[170px]">
      <div className="text-on-surface font-semibold text-body-sm font-headline-sm pb-1 border-b border-outline-variant/20 flex items-center justify-between">
        <span>{data.month}</span>
        <span className="text-[10px] text-tertiary bg-tertiary-container/20 px-1.5 py-0.5 rounded font-mono">
          {data.quotesCount} Quotes
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 text-on-surface-variant pt-0.5">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-primary-container"></span>
          <span>Quote Value:</span>
        </span>
        <span className="text-on-surface font-bold">
          ${data.quoteValue.toLocaleString('en-US')}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
          <span>Win Rate:</span>
        </span>
        <span className="text-tertiary font-bold">{data.winRate}%</span>
      </div>
      <div className="flex items-center justify-between gap-3 text-outline text-[11px] pt-1 border-t border-outline-variant/15">
        <span>Accepted:</span>
        <span>
          {data.acceptedCount} of {data.quotesCount} closed
        </span>
      </div>
    </div>
  );
}

export function MonthlyPerformanceChart({ quotes, onShowToast }: MonthlyPerformanceChartProps) {
  const [chartMode, setChartMode] = useState<ChartMode>('combined');
  const uniqueId = useId();

  const data: MonthlyPerformanceRecord[] = getMonthlyPerformance(quotes);

  // Compute key summary numbers
  const totalValue = data.reduce((sum, item) => sum + item.quoteValue, 0);
  const avgWinRate = Math.round(
    data.reduce((sum, item) => sum + item.winRate, 0) / Math.max(1, data.length)
  );
  const latestMonth = data[data.length - 1];

  return (
    <section
      id="dashboard-monthly-performance-card"
      className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 shadow-sm space-y-space-md"
    >
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/15">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-label-md font-label-md uppercase tracking-wider text-on-surface-variant font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
              Quote Performance &amp; Win Rate
            </span>
          </div>
          <div className="text-body-sm font-body-sm text-outline">
            Monthly pipeline volume and proposal closing efficiency
          </div>
        </div>

        {/* View Mode Toggle Pill Buttons */}
        <div
          id="chart-mode-toggle-group"
          className="inline-flex items-center p-0.5 rounded-lg bg-surface-container border border-outline-variant/20 self-start sm:self-auto font-mono text-[11px]"
        >
          <button
            id="chart-mode-combined-btn"
            type="button"
            onClick={() => {
              setChartMode('combined');
              if (onShowToast) onShowToast('Showing Combined Value & Win Rate view', 'analytics');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              chartMode === 'combined'
                ? 'bg-surface-container-high text-primary font-medium shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Combined
          </button>
          <button
            id="chart-mode-value-btn"
            type="button"
            onClick={() => {
              setChartMode('value');
              if (onShowToast) onShowToast('Filtered to Monthly Quote Values ($)', 'payments');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              chartMode === 'value'
                ? 'bg-surface-container-high text-primary font-medium shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Value ($)
          </button>
          <button
            id="chart-mode-winrate-btn"
            type="button"
            onClick={() => {
              setChartMode('winRate');
              if (onShowToast) onShowToast('Filtered to Proposal Win Rates (%)', 'verified');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              chartMode === 'winRate'
                ? 'bg-surface-container-high text-tertiary font-medium shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Win Rate (%)
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-3 gap-2 py-1">
        <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15">
          <div className="text-[11px] font-mono text-outline">6-Mo Volume</div>
          <div className="text-body-md font-code-md font-semibold text-on-surface mt-0.5 font-mono">
            ${(totalValue / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] font-mono text-secondary flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>
            +18.4% MoM
          </div>
        </div>

        <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15">
          <div className="text-[11px] font-mono text-outline">Avg Win Rate</div>
          <div className="text-body-md font-code-md font-semibold text-tertiary mt-0.5 font-mono">
            {avgWinRate}%
          </div>
          <div className="text-[10px] font-mono text-tertiary flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[12px]">check_circle</span>
            High conversion
          </div>
        </div>

        <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15">
          <div className="text-[11px] font-mono text-outline">Active Month</div>
          <div className="text-body-md font-code-md font-semibold text-primary mt-0.5 font-mono">
            ${(latestMonth.quoteValue / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] font-mono text-outline truncate mt-0.5">
            {latestMonth.acceptedCount} of {latestMonth.quotesCount} won
          </div>
        </div>
      </div>

      {/* Recharts Visualization Container */}
      <div className="w-full h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`valueBarGrad-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8083ff" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8083ff" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#464554"
              strokeDasharray="3 3"
              strokeOpacity={0.25}
              vertical={false}
            />

            <XAxis
              dataKey="shortMonth"
              stroke="#908fa0"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
              tickLine={false}
              axisLine={{ stroke: '#464554', strokeOpacity: 0.3 }}
            />

            {/* Left Axis: Quote Value ($) */}
            {(chartMode === 'combined' || chartMode === 'value') && (
              <YAxis
                yAxisId="left"
                stroke="#908fa0"
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `$${Math.round(val / 1000)}k`}
                domain={[0, 'dataMax + 5000']}
              />
            )}

            {/* Right Axis: Win Rate (%) */}
            {(chartMode === 'combined' || chartMode === 'winRate') && (
              <YAxis
                yAxisId={chartMode === 'winRate' ? 'left' : 'right'}
                orientation={chartMode === 'winRate' ? 'left' : 'right'}
                stroke="#4cd7f6"
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `${val}%`}
                domain={[50, 100]}
              />
            )}

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}
              formatter={(value: string) => {
                if (value === 'quoteValue') return <span className="text-on-surface-variant font-mono">Quote Value ($)</span>;
                if (value === 'winRate') return <span className="text-on-surface-variant font-mono">Win Rate (%)</span>;
                return value;
              }}
            />

            {/* Quote Value Bars */}
            {(chartMode === 'combined' || chartMode === 'value') && (
              <Bar
                yAxisId="left"
                dataKey="quoteValue"
                name="quoteValue"
                fill={`url(#valueBarGrad-${uniqueId})`}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            )}

            {/* Win Rate Line */}
            {(chartMode === 'combined' || chartMode === 'winRate') && (
              <Line
                yAxisId={chartMode === 'winRate' ? 'left' : 'right'}
                type="monotone"
                dataKey="winRate"
                name="winRate"
                stroke="#4cd7f6"
                strokeWidth={2.5}
                dot={{
                  r: 3.5,
                  fill: '#121318',
                  stroke: '#4cd7f6',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5.5,
                  fill: '#4cd7f6',
                  stroke: '#121318',
                  strokeWidth: 2,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend / Context Annotation */}
      <div className="flex items-center justify-between text-[11px] font-mono text-outline pt-1 border-t border-outline-variant/10">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-primary-container"></span>
          <span>Bars: Total Quote Value ($)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>Line: Closing Win Rate (%)</span>
        </span>
      </div>
    </section>
  );
}
