const { randomAvatar } = require("./helper");
const changeActiveControl = require("./personal/changeActiveControl");
const changeAvatar = require("./personal/changeAvatar");
const changeBirthDay = require("./personal/changeBirthDay");
const changeBusinessPersonalization = require("./personal/changeBusinessPersonalization");
const changeDeleteSecurity = require("./personal/changeDeleteSecurity");
const changeDeviceContact = require("./personal/changeDeviceContact");
const changeEnhancedControl = require("./personal/changeEnhancedControl");
const changeFullName = require("./personal/changeFullName");
const changeGender = require("./personal/changeGender");
const importCsvContact = require("./personal/importCsvContact");
const { random } = require("./until");

class Personal {
  async run(page, setting) {
    await changeAvatar(page, randomAvatar(setting.path_avatar));
    const lists = readTextToArray("./helper/full-name.txt");
    const name = parseTextData(lists);
    const rName = name[random(0, name.length - 1)];
    await changeFullName(page, rName[0], rName[1]);
    await changeBirthDay(
      page,
      random(1, 28),
      random(1, 12),
      random(1975, 1999)
    );
    await changeGender(page, random(0, 1));
    await changeActiveControl(page);
    await changeDeleteSecurity(page);
    await changeEnhancedControl(page);
    await importCsvContact(page, setting.path_csv_contact);
    await changeBusinessPersonalization(page);

    // await changeDeviceContact(page);
  }
}

module.exports = Personal;

//   await personal.changeActiveControl();
//   //   await personal.changeAvatar("path avatar");//
//   await personal.changeBirthDay(25, 5, 1994);
//   await personal.changeBusinessPersonalization();
//   await personal.changeDeleteSecurity();
//   await personal.changeEnhancedControl();
//   await personal.changeFullName("tuan", "tran");
//   await personal.changeGender("nu");
//   //   await personal.importCsvContact("path/csv");
