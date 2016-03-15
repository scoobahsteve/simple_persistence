var chai = require('chai');
var server = require(__dirname + '/../server');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;

describe('the http server', () => {
  after(() => {
    server.close();
  });
  it('should write a file', (done) => {
    request('localhost:3000')
      .post('/')
      .end(function(err, res) {
        expect(err).to.be(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('file written');
        done();
      });
  });
  it('should read a file', (done) => {
    request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.be(null);
        expect(res.body.msg).to.not.eql(null);
        done();
      });
  });
  it('should 404 a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end(function(err, res) {
        expect(err).to.be(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
