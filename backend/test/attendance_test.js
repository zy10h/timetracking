const { expect } = require('chai');
const sinon = require('sinon');
const Attendance = require('../models/Attendance');
const ctrl = require('../controllers/attendanceController');

describe('Attendance controller', () => {
  afterEach(() => sinon.restore());

  it('getAttendance should return array', async () => {
    const fake = [{ _id:'1' }];
    sinon.stub(Attendance, 'find').returns({ sort: () => fake });
    const req = { user: { id: 'u1' } };
    const res = { json: d => { expect(d).to.equal(fake); } , status: () => ({ json:()=>{} }) };
    await ctrl.getAttendance(req, res);
  });
});
