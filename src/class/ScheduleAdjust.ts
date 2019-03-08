import { SpreadSheetNamespace } from './SpreadSheet';

export namespace ScheduleAdjustNameSpace {

  export class ScheduleAdjust {


    answer_sheet: GoogleAppsScript.Spreadsheet.Sheet;
    adjustment_sheet: GoogleAppsScript.Spreadsheet.Sheet;
    spread_sheet: SpreadSheetNamespace.SpreadSheet;
  
    constructor(){
      this.spread_sheet = SpreadSheetNamespace.SpreadSheet.instance;
      this.answer_sheet = this.spread_sheet.getSheet(SpreadSheetNamespace.SHEET_NAME.FORM_ANSWER);

      this.adjustment_sheet = this.spread_sheet.getSheet(SpreadSheetNamespace.SHEET_NAME.ADJUSTMENT);
    }

    adjustData(){

      const range = this.answer_sheet.getRange('A1:L50' );
      const all_answer_map = range.getValues();
      Logger.log('all_answer_map');
      Logger.log(all_answer_map);
      // const user_schedule_requested_arr = all_answer_map.map((row)=>{ return row[4]});
      // Logger.log(user_schedule_requested_arr);

      const user_info = this.extract_users(all_answer_map);
      const users_arr = user_info.users;
      Logger.log(`users_arr -- ${users_arr}`);

      const existed_user = users_arr.filter(value => value);
      Logger.log(`existed_user -- ${existed_user}`);

      const user_schedule_arr = user_info.user_schedule;
      Logger.log(`user_schedule_arr -- ${user_schedule_arr}`);
      const user_teacher_expect_arr = user_info.user_teacher_expect;
      Logger.log(`user_teacher_expect_arr ${user_teacher_expect_arr}`);



      const range2 = this.adjustment_sheet.getRange('A1:V100' );
      const all_adjustment_map = range2.getValues();




      const scheduled_days = this.extract_scheduled_days(all_adjustment_map);
      Logger.log(`scheduled_days - ${scheduled_days}` )

      const scheduled_field:string[][] = []

      for( let i=0; i < users_arr.length; i++){

        const oneuser_expected_schedule: string = user_schedule_arr[i] || '';
        Logger.log(`oneuser_expected_schedule ${oneuser_expected_schedule}`);
        const oneuser_expected_teacher = user_teacher_expect_arr[i] || '';
        Logger.log(`oneuser_expected_teacher ${{oneuser_expected_teacher}}`);
        const oneuser_schedule: string[] = []


        scheduled_days.forEach((one_day: string)=>{

          if(oneuser_expected_schedule.indexOf(one_day) !== -1){
            oneuser_schedule.push(oneuser_expected_teacher);
          }else{
            oneuser_schedule.push('');
          }

        });

        scheduled_field.push(oneuser_schedule);
      }

      Logger.log(`scheduled_field ${scheduled_field}`);

      this.write_schedule(scheduled_field);

    }

    write_schedule(scheduled_field){

      const numrows = scheduled_field.length;
      const numcolumns = scheduled_field[0].length;
      this.adjustment_sheet.getRange(2, 3, numrows, numcolumns ).clear()
      this.adjustment_sheet.getRange(2, 3, numrows, numcolumns ).setValues(scheduled_field);

    }


    extract_scheduled_days(all_adjustment_map){

      const scheduled_days = all_adjustment_map[0].map((value)=>{ return String(value)});
      scheduled_days.shift();
      scheduled_days.shift();
      Logger.log('scheduled_days');
      Logger.log( scheduled_days);


      return scheduled_days;
    }
    

    extract_users(all_answer_map){
      const users = all_answer_map.map(
        (row)=>{ 
          return row[2]
        }
      )
      const user_schedule = [].concat(all_answer_map.map(
        (row)=>{ 
          return row[4]
        }
      ))
      const user_teacher_expect = [].concat(all_answer_map.map(
        (row)=>{ 
          return row[5]
        }
      ))
      Logger.log(`users ${users}`);
      // Logger.log(users);
      users.shift()
      user_schedule.shift()
      user_teacher_expect.shift()

      // Logger.log(users);
        const num_row = users.length;
      for(let i=0; i < num_row; i++){
        if(!users[users.length -1] ){
          users.pop();
          user_schedule.pop();
          user_teacher_expect.pop();
        }else{
          break;
        }
      }

      Logger.log('users ss', users);
      // Logger.log(users);
      const user_info =  {users, user_schedule, user_teacher_expect}
      Logger.log('user_info', user_info);
      return user_info;
    }




  }
}

