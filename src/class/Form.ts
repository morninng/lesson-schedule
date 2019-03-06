import { SpreadSheetNamespace } from './SpreadSheet';

export namespace FormNamespace {

  
  export class Form {


    form_sheet: GoogleAppsScript.Spreadsheet.Sheet ;
    spread_sheet: SpreadSheetNamespace.SpreadSheet;
  
    constructor(){
      this.spread_sheet = SpreadSheetNamespace.SpreadSheet.instance;
      this.form_sheet = this.spread_sheet.getSheet(SpreadSheetNamespace.SHEET_NAME.FORM_SOURCE);
    }

    createForm(){
      const title = this.getFormTitle();
      const newForm = FormApp.create(title);
      this.adjustData(newForm);
      Logger.log('Published URL: ' + newForm.getPublishedUrl());
      Logger.log('Editor URL: ' + newForm.getEditUrl());
    }

    editForm(){
      const originalForm = FormApp.openById('13FevR-yZOr4M_lICl_1j7ropq16kLd8whxGskchKrBk');
      this.getFormTitle();
      this.adjustData(originalForm);

      Logger.log('Published URL: ' + originalForm.getPublishedUrl());
      Logger.log('Editor URL: ' + originalForm.getEditUrl());
    }

    adjustData(newForm){

      // const validationEmail = 
      //   FormApp.createTextValidation().requireTextIsEmail();

      newForm.addTextItem()
        .setTitle('Email')
        .setRequired(true)
        // .setValidation(validationEmail)

      newForm.addTextItem()
        .setTitle('名前（漢字）')
        .setRequired(true);

      newForm.addTextItem()
        .setTitle('name（alphabet）')
        .setRequired(true);


      /* schedule */
      const schedule_arr = this.getScheduleChoice();
      Logger.log('schedule_arr', schedule_arr);
      newForm.addCheckboxItem()
        .setTitle('受講可能日時（可能な日時を全て選択）')
        .setChoiceValues(schedule_arr)
        .setRequired(true);

      /* teacher */

      const teachers = this.getTeachers()
      newForm.addCheckboxItem()
        .setTitle('希望講師')
        .setChoiceValues(teachers)
        .setRequired(true);


      /* level */
      newForm.addMultipleChoiceItem()
        .setTitle('レッスン種別')
        .setChoiceValues(['ディベーター','ジャッジ','両方'])
        .setRequired(true);

      /* lesson type */
      newForm.addMultipleChoiceItem()
        .setTitle('レッスン種別')
        .setChoiceValues(['超初級','初級','中級','上級'])
        .setRequired(true);


      /* expect the same group */
      newForm.addTextItem()
        .setTitle('前回と同じグループを希望のかたは、グループ名');
      /*  audience */

      const observable_lesson_candidates = this.getObservableLesson()
      newForm.addCheckboxItem()
        .setTitle('見学希望申し込み')
        .setChoiceValues(observable_lesson_candidates);


    }


    getTeachers(){
      const range = this.form_sheet.getRange('A31:B31' );
      const teachers = range.getValues();
      const adjusted_data =  teachers[0].map((value: object)=>{ return String(value) });
      return adjusted_data;

    }



    getScheduleChoice(): string[]{
      const range = this.form_sheet.getRange('C7:H27' );
      const schedule_map = range.getValues();
      const schedule_arr = schedule_map.map((each_schedule: object[])=>{
        let data = each_schedule.join(' ');
        return data;
      })
      return schedule_arr;  
    }

    getFormTitle(){
      const range = this.form_sheet.getRange('A2:B2' );
      const title_map = range.getValues();
      Logger.log(`title_map ${title_map}`)
      const title = title_map[0].join(' - ');
      Logger.log(`title ${title}`)
      return title;
    }

    getObservableLesson(){
      const range = this.form_sheet.getRange('A44:D44' );
      const observable_lesson_candidates = range.getValues();
      Logger.log(`observable_lesson_candidates`);
      Logger.log(observable_lesson_candidates);
      const adjusted_data =  observable_lesson_candidates[0].map((value: object)=>{ return String(value) });
      Logger.log(`adjusted_data ${adjusted_data}`);
      return adjusted_data;
    }




  }
}
