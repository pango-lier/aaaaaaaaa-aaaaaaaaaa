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

class Personal {
  async run(page) {
    const pathAvatar = "E:/SEODATA/SkyNet1.0.2/avt/1.jpg";
    await changeAvatar(page, pathAvatar);
    await changeFullName(page, "trong", "tran");
    await changeBirthDay(page, 22, 5, 1995);
    await changeGender(page, "nam");
    await changeActiveControl(page);
    await changeDeleteSecurity(page);
    await changeEnhancedControl(page);
    const pathCsv = "E:/SEODATA/SkyNet1.0.2/contacts.csv";
    await importCsvContact(page, pathCsv);
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
