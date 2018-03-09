
import {Observable as rxjs} from 'rxjs';
import {Observable as rxjs_Observable} from 'rxjs/Observable';
import {Observable as rxjs_internal_Observable} from 'rxjs/internal/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

try {
  (rxjs as any).interval();
} catch (error) {
  console.log(rxjs);
  console.error(error);
}

try {
  (rxjs_Observable as any).interval()
} catch (e) {
  console.log(rxjs_Observable);
  console.error(e);
}

try {
  (rxjs_internal_Observable as any).interval()
} catch (e) {
  console.log(rxjs_internal_Observable);
  console.error(e);
}



