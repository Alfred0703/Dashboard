import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fileName = '';

  @Input() chartData: any;

	chartOptions = {
		zoomEnabled: true,
		exportEnabled: true,
		theme: "light2",
		title: {
		  text: "Value over time"
		},
		data: [{
		  type: "line",
		  dataPoints: [] as {x: number; y:number} []
		}]
	  };
	
	  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}
	
	  ngOnInit(): void {
		// Optional: You can load initial data or perform other setup logic here
		this.updateChartData();
	  }

	  ngOnChanges(changes: SimpleChanges): void {
		if (changes['chartData'] && changes['chartData'].currentValue) {
			this.updateChartData();
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
          const dps = [];
    
          for (let i = 1; i < csvRows.length; i++) {
            const columns = csvRows[i].split(',');
    
            // Skip empty rows
            if (columns.length !== 2) {
              continue;
            }
    
            const timestamp = parseInt(columns[0]);
            const dataEntry = parseFloat(columns[1]);
    
            dps.push({ x: timestamp, y: dataEntry });
          }
    
          console.log('Parsed Data:', dps);
    
          // Ensure chartOptions and its nested properties are defined
          if (!this.chartOptions.data) {
            this.chartOptions.data = [];
          }
    
          if (!this.chartOptions.data[0]) {
            this.chartOptions.data[0] = { type: 'line', dataPoints: [] };
          }
    
          // Update chart data directly, and trigger change detection
          this.chartOptions.data[0].dataPoints = [...dps];
          this.cdr.detectChanges();
    
          console.log('Updated chartOptions:', this.chartOptions);
        } catch (error) {
          console.error('Error parsing CSV file:', error);
        }
      };
    
      reader.readAsText(file);
    }
    
        

    private updateChartData(): void {
      // Use this.chartData to update the chart with the new data
      this.chartOptions.data[0].dataPoints = this.chartData;
    }

    chartRendered(event: any): void {
      console.log('Chart rendered:', event);
    }
    
}
