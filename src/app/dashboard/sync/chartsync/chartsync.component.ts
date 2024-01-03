import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import * as CanvasJS from 'canvasjs';
import { of, map, catchError } from 'rxjs';

interface DataPoint {
  x: number;
  y: number;
}

interface ChartData {
  type: string;
  name?: string;
  showInLegend?: boolean;
  dataPoints: DataPoint[];
}


@Component({
  selector: 'app-chartsync',
  templateUrl: './chartsync.component.html',
  styleUrls: ['./chartsync.component.css']
})
export class ChartsyncComponent implements OnInit{

  chartData: DataPoint[] = [];
  charts: CanvasJS.Chart[] = [];

  chartOptions = {
    zoomEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    animationenabled: true,
    data: [] as ChartData[]
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      const chart = new CanvasJS.Chart(`chartContainer${i}`, {
        zoomEnabled: true,
        exportEnabled: true,
        theme: 'light2',
        animationEnabled: true,
        axisX: {
          title: 'Date and Time'
        },
        axisY: {
          title: 'Value'
        },
        title: { // Add a title property for the axis
          text: 'Chart Title'
        },
        data: [] as any[],
      });

      // Render the chart and add it to the charts array
      chart.render();
      this.charts.push(chart);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.parseCSV(file);
    }
  }
  
  parseCSV(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const csvData = e.target.result;
        const csvRows = csvData.split('\n');
        const timestampDps = [];
        const chartDps: any[] = [];
        const chartNames = csvRows[0].split(',').slice(1); // Get names from the first row, excluding timestamp

        for (let i = 1; i < csvRows.length; i++) {
          const columns = csvRows[i].split(',');

          // Skip empty or incomplete rows
          if (columns.length !== 6) { // Max number of sensors (N-1)
            continue;
          }

          const timestamp = parseInt(columns[0]);
          const dataEntry = parseFloat(columns[1]);

          timestampDps.push({ x: timestamp, y: dataEntry });

          // Extract data for each chart (modify as needed based on your columns)
          const chartValues = columns.slice(1).map(parseFloat);

          chartDps.push({
            x: timestamp,
            ...chartValues.reduce((acc: { [x: string]: any; }, value: any, index: number) => {
              acc[`y${index + 1}`] = value;
              return acc;
            }, {})
          });
        }

        // Update common timestamp data
        this.chartData = [...timestampDps];

        // Synchronize charts by updating their shared data series
        const sharedDataSeries: CanvasJS.ChartDataSeries[] = chartNames.map((name: any, index: number) => {
          const randomColor = this.getRandomColor();
          return {
            type: 'line',
            showInLegend: true,
            name: name,
            color: randomColor,
            dataPoints: chartDps.map(d => ({ x: d.x, y: d[`y${index + 1}`], color: randomColor }))
          };
        });

        // Ensure chartOptions and its nested properties are defined
        if (!this.chartOptions.data) {
          this.chartOptions.data = [];
        }

        // Update chart data directly, and trigger change detection
        this.chartOptions.data = chartNames.map((name: any, index: number) => {
          const randomColor = this.getRandomColor();
          return {
            type: 'line',
            showInLegend: true,
            legendText: name,
            color: randomColor,
            dataPoints: chartDps.map((d) => ({ x: d.x, y: d[`y${index + 1}`], color: randomColor }))
          };
        });

        // Update each chart with the shared data series
        this.charts.forEach((chart, index) => {
          chart.options.data = [sharedDataSeries[index]];
          chart.render();
        });

        this.cdr.detectChanges();

      } catch (error) {
        console.error('Error parsing CSV file:', error);
      }
    };

    reader.readAsText(file);
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getChartInstance = (chart: CanvasJS.Chart) => {
    this.charts.push(chart);
  };

  mergeOptions(baseOptions: any, additionalOptions: any): any {
    return Object.assign({}, baseOptions, additionalOptions);
  }


}