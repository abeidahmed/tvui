import Model, { attr, belongsTo } from '@ember-data/model';

export default class AppointmentModel extends Model {
  @attr('date') startTime;
  @attr('number') duration;
  @belongsTo('user') creator;
}
