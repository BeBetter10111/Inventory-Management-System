// Simple Line Chart component
export function LineChart({ data, label }) {
  const maxValue = Math.max(...data)
  const height = 200
  const width = 400
  const padding = 40

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - (value / maxValue) * (height - 2 * padding)
    return { x, y, value }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`grid-${i}`}
          x1={padding}
          y1={padding + (i * (height - 2 * padding)) / 4}
          x2={width - padding}
          y2={padding + (i * (height - 2 * padding)) / 4}
          stroke="#e5e7eb"
          strokeDasharray="4"
        />
      ))}

      {/* Lines */}
      {[0, 1].map((lineIndex) => {
        const offsetData = data.map((v, i) => v + (lineIndex === 0 ? 20 : 10) - i)
        const linePoints = offsetData.map((value, index) => {
          const x = padding + (index / (offsetData.length - 1)) * (width - 2 * padding)
          const y = height - padding - (value / maxValue) * (height - 2 * padding)
          return { x, y }
        })
        const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
        return (
          <path
            key={`line-${lineIndex}`}
            d={linePath}
            fill="none"
            stroke={lineIndex === 0 ? '#ef4444' : '#06b6d4'}
            strokeWidth="2"
          />
        )
      })}

      {/* X-axis labels */}
      {months.map((month, i) => (
        <text
          key={`month-${i}`}
          x={padding + (i / (months.length - 1)) * (width - 2 * padding)}
          y={height - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
        >
          {month}
        </text>
      ))}

      {/* X-axis */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d1d5db" />
    </svg>
  )
}

// Simple Bar Chart component
export function BarChart({ data, label }) {
  const maxValue = Math.max(...data.flat())
  const height = 250
  const width = 400
  const padding = 40
  const barWidth = 25
  const groupSpacing = 50

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`grid-${i}`}
          x1={padding}
          y1={padding + (i * (height - 2 * padding)) / 4}
          x2={width - padding}
          y2={padding + (i * (height - 2 * padding)) / 4}
          stroke="#e5e7eb"
          strokeDasharray="4"
        />
      ))}

      {/* Bars */}
      {data[0].map((value, monthIndex) => {
        const groupX = padding + 20 + (monthIndex / months.length) * (width - 2 * padding - 40)
        return (
          <g key={`bars-${monthIndex}`}>
            {/* Import bars (orange) */}
            <rect
              x={groupX - barWidth - 5}
              y={height - padding - (value / maxValue) * (height - 2 * padding)}
              width={barWidth}
              height={(value / maxValue) * (height - 2 * padding)}
              fill="#ef4444"
            />
            {/* Export bars (green) */}
            <rect
              x={groupX + 5}
              y={height - padding - (data[1][monthIndex] / maxValue) * (height - 2 * padding)}
              width={barWidth}
              height={(data[1][monthIndex] / maxValue) * (height - 2 * padding)}
              fill="#06b6d4"
            />
            {/* Month labels */}
            <text
              x={groupX}
              y={height - 10}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {months[monthIndex]}
            </text>
          </g>
        )
      })}

      {/* Y-axis */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d1d5db" />
      {/* X-axis */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d1d5db" />
    </svg>
  )
}
