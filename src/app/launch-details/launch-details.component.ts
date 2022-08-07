import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { LaunchDetailsGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private launchDetailsService: LaunchDetailsGQL
  ) { }

  launchDetails$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id') || '';
      return this.launchDetailsService.fetch({ id });
    }),
    map(res => res.data.launch)
  );

  ngOnInit(): void {
  }

}
