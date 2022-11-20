import { INestApplication, UseGuards, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as pactum from 'pactum';
import { PrismaService } from "../src/core/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "src/routes/auth/models";
import { EditUserDto } from "src/routes/user/models";
import { CreateBookmarkDto, EditBookmarkDto } from "src/routes/bookmark/models";

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3900);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3900');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {

    const dto: AuthDto = {
      email: 'berat@example.com',
      password: '123',
      firstName: "Berat",
      lastName: "Karaaslan"
    }
    describe('Signup', () => {

      it('should signup', () => {

        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201).stores('userAt', 'access_token');
      });
    });

    describe('Signup', () => {

      it('if email empty', () => {

        return pactum.spec().post('/auth/signup').withBody({password: dto.password}).expectStatus(400);
      });
    });

    describe('Signup', () => {

      it('if password empty', () => {

        return pactum.spec().post('/auth/signup').withBody({email: dto.email}).expectStatus(400);
      });
    });

    describe('Signin', () => {

      it('Should signin', () =>{

        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200);
      })
    });
  });

  describe('User', () => {


    describe('Get me', () => {
      
      it('should get current user', () => {

        return pactum.spec().get('/users/me').withHeaders({
          authorization: 'Bearer $S{userAt}'
        }).expectStatus(200)
      });
    });

    describe('Edit user', () => {
      it('should updated user', () => {
        const dto : EditUserDto = {
          email: 'beratk@example.com',
          firstName: 'Name1'
        }
        return pactum.spec().patch('/users').withHeaders({
          authorization: 'Bearer $S{userAt}'
        }).withBody(dto).expectStatus(200).expectBodyContains(dto.firstName).expectBodyContains(dto.email)
      });
    });

  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([])
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
      };
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id')
      });
    });

    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe('Edit bookmark by id', () => {
      const dto: EditBookmarkDto = {
        title:
          'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
        description:
          'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
      };
      it('should edit bookmark', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe('Delete bookmark by id', () => {
      it('should delete bookmark', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });

      it('should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});