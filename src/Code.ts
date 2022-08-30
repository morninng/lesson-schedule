
import { FormNamespace } from './class/Form';
import { ScheduleAdjustNameSpace } from './class/ScheduleAdjust';

function createForm(): void {
  const form_obj = new FormNamespace.Form();
  form_obj.createForm()
}




function editForm(){

  const form_obj = new FormNamespace.Form();
  form_obj.editForm()
}

function adjustData(){
  const schedule_adjust = new ScheduleAdjustNameSpace.ScheduleAdjust();
  schedule_adjust.adjustData()

}

function test(){
  Logger.log('aaa');
}


// function editWrong(){
  
//   Logger.log('editForm');
//   const originalForm = FormApp.openById('1J3aaaUE3DoPCqUxFHc');
//   add_items(originalForm)
  
// }


// function remove_items(){
//   Logger.log('editForm');
//   const originalForm = FormApp.openById('1J3_FM_VWfGhebKlSg3idbOTbhPJeSIUE3DoPCqUxFHc');
// }


// function add_items(form){
//   Logger.log('add_items');
  
//   var item = form.addCheckboxItem();
//   item.setTitle('title title title?');
//   item.setChoices([
//           item.createChoice('Ketchup'),
//           item.createChoice('Mustard'),
//           item.createChoice('Relish')
//       ]);
//   form.addMultipleChoiceItem()
//       .setTitle('Do you prefer cats or dogs?')
//       .setChoiceValues(['Cats','Dogs'])
//       .showOtherOption(true);
//   form.addPageBreakItem()
//       .setTitle('Getting to know you');
//   form.addDateItem()
//       .setTitle('When were you born?');
//   form.addGridItem()
//       .setTitle('Rate your interests')
//       .setRows(['Cars', 'Computers', 'Celebrities'])
//       .setColumns(['Boring', 'So-so', 'Interesting']);
//   Logger.log('Published URL: ' + form.getPublishedUrl());
//   Logger.log('Editor URL: ' + form.getEditUrl());

// }


