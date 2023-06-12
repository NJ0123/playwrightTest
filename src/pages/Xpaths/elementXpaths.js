module.exports = {
    getInputFromValue: (inputValue) => `//input[@value="${inputValue}"]`,
    getInputFromName: (inputName) => `//input[@name="${inputName}"]`,
    getInputFromId: (inputId) => `//input[@id="${inputId}"]`,
    getParagraphFromText: (pText) => `//p[contains(text(),"${pText}")]`,
    getAnchorFromText: (aText) => `//a[contains(text(),"${aText}")]`,
    getThFromText: (thText) => `//th[contains(text(),"${thText}")]`,
    getAnchorFromId: (aId) => `//a[@id="${aId}"]`,
    getTdFromText: (tdText) => `//td[contains(text(),"${tdText}")]`
  };