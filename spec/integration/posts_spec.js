const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {

  beforeEach((done) => {
    this.topic;
    this.post;

    sequelize.sync({force: true}).then((res) => {

//#1 create topic and post, and associate them
      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id // associated post and topic
        })
        .then((post) => {
          this.post = post;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

    describe("GET /topics/:topicId/posts/new", () => {

    it("should render a new post form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });

  });

});