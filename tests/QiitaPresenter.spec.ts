import { QiitaPresenter } from '@/QiitaPresenter'
import { QiitaItems } from '@/QiitaItems'
import { QiitaWidgetParam } from '@/interface'

jest.mock('@/QiitaItemsApi')
jest.mock('@/QiitaItems')

const userMock = {
  description: 'user-desc',
  facebook_id: 'fb-id',
  followers_count: 1,
  github_login_name: 'github-name',
  id: 'user-id',
  items_count: 1,
  linkedin_id: 'linkedin-id',
  location: 'my-location',
  name: 'my-name',
  organization: 'my-organization',
  permanent_id: 1,
  profile_image_url: './profile.png',
  twitter_screen_name: 'twitter-name',
  website_url: 'https://example.com/website',
  likes_count: 2,
  url: 'https://example.com/',
}

const articleMock = {
  body: 'article-body',
  coediting: true,
  comments_count: 1,
  created_at: '2000-01-01T00:00:00+00:00',
  id: 'article-id',
  likes_count: 2,
  private: false,
  reactions_count: 3,
  rendered_body: '<p>rendered-body</p>',
  tags: [
    { name: 'tag-1', versions: ['1.0'] },
    { name: 'tag-2', versions: ['1.0'] },
  ],
  title: 'article-title',
  updated_at: '2000-01-01T00:00:00+00:00',
  url: './article-url/',
  user: userMock,
}

QiitaItems.prototype.getUserToShow = jest.fn(() => {
  return userMock
})

QiitaItems.prototype.getArticlesToShow = jest.fn(() => {
  return [articleMock]
})

document.body.innerHTML = resetBody()
let dest: HTMLElement = resetMockDest()
const items = new QiitaItems({})
let presenterConf: QiitaWidgetParam = {}
let presenter = new QiitaPresenter(dest, items, presenterConf)

function resetBody() {
  return `
  <template id="qiita-user-tpl">
    <div class="user-template">
        <img class="js-profile-image-url" src="" alt="" />
        <a class="js-url" target="_blank"><h1 class="js-id"></h1></a>
        <a class="js-website-url"></a>
        <p class="js-name"></p>
        <p class="js-description"></p>
        <p class="js-facebook-id"></p>
        <p class="js-followers-count"></p>
        <p class="js-github-login-name"></p>
        <p class="js-items-count"></p>
        <p class="js-linkedin-id"></p>
        <p class="js-location"></p>
        <p class="js-organization"></p>
        <p class="js-permanent-id"></p>
        <p class="js-twitter-screen-name"></p>
        <p class="js-likes-count"></p>
    </div>
  </template>

  <template id="qiita-article-tpl">
    <li class="article-template">
      <a class="js-url" target="_blank">
        <p class="js-title"></p>
        <p class="js-body"></p>
        <p class="js-comments-count"></p>
        <p class="js-comments-count"></p>
        <p class="js-created-at"></p>
        <p class="js-id"></p>
        <p class="js-likes-count"></p>
        <p class="js-reactions-count"></p>
        <p class="js-rendered-body"></p>
        <p class="js-tags"></p>
        <p class="js-updated-at"></p>
        <p class="js-coediting"></p>
        <p class="js-private"></p>
      </a>
    </li>
  </template>
  <div id="alt-user-dest"></div>
  <div id="alt-article-dest"></div>`
}

function resetMockDest(innerHTML = '') {
  const div = <HTMLElement>document.createElement('div')
  div.innerHTML =
    innerHTML ||
    `
  <h1 class="js-subject"></h1>
  <div class="js-qiita-user"></div>
  <ul class="js-qiita-article"></ul>`
  return div
}

describe('QiitaPresenter', () => {
  beforeEach(() => {
    document.body.innerHTML = resetBody()
    dest = resetMockDest()
    presenter = new QiitaPresenter(dest, items, presenterConf)
  })

  afterEach(() => {
    presenterConf = {}
  })

  describe('user template rendering details:', () => {
    let template = dest.querySelectorAll('.user-template')
    let tpl = template[0]

    beforeEach(() => {
      presenter.render()
      template = dest.querySelectorAll('.user-template')
      tpl = template[0]
    })

    it('should insert a rendered user template to the destination', () => {
      expect(template.length).toBe(1)
    })

    it('should have values of the QiitaUser members: case 1', () => {
      const textSelectors = new Map<string, string>([
        ['.js-description', 'user-desc'],
        ['.js-facebook-id', 'fb-id'],
        ['.js-followers-count', '1'],
        ['.js-github-login-name', 'github-name'],
        ['.js-id', 'user-id'],
        ['.js-items-count', '1'],
        ['.js-linkedin-id', 'linkedin-id'],
        ['.js-location', 'my-location'],
        ['.js-name', 'my-name'],
        ['.js-organization', 'my-organization'],
        ['.js-permanent-id', '1'],
        ['.js-twitter-screen-name', 'twitter-name'],
        ['.js-likes-count', '2'],
      ])

      textSelectors.forEach((value, key: string) => {
        const el = tpl.querySelector(key)
        if (el === null) throw new Error(`${key} is not found!`)
        expect(el.textContent).toBe(value)
      })
    })

    it('should have values of the QiitaUser members: case 2', () => {
      const hrefSelectors = new Map<string, string>([
        ['.js-website-url', 'https://example.com/website'],
        ['.js-url', 'https://example.com/'],
      ])

      hrefSelectors.forEach((value, key: string) => {
        const el = tpl.querySelector(key)
        if (el === null) throw new Error(`${key} is not found!`)
        expect(el.getAttribute('href')).toBe(value)
      })
    })

    it('should have values of the QiitaUser members: case 3', () => {
      const srcSelectors = new Map<string, string>([['.js-profile-image-url', './profile.png']])

      srcSelectors.forEach((value, key: string) => {
        const el = tpl.querySelector(key)
        if (el === null) throw new Error(`${key} is not found!`)
        expect(el.getAttribute('src')).toBe(value)
      })
    })
  })

  describe('article template rendering details:', () => {
    let template = dest.querySelectorAll('.article-template')
    let tpl = template[0]

    beforeEach(() => {
      presenter.render()
      template = dest.querySelectorAll('.article-template')
      tpl = template[0]
    })

    it('should insert a rendered article template to the destination', () => {
      expect(template.length).toBe(1)
    })

    it('should have values of the QiitaArticle members', () => {
      const textSelectors = new Map<string, string>([
        ['.js-body', 'article-body'],
        ['.js-comments-count', '1'],
        ['.js-created-at', '2000-01-01T00:00:00+00:00'],
        ['.js-id', 'article-id'],
        ['.js-likes-count', '2'],
        ['.js-reactions-count', '3'],
        ['.js-rendered-body', '<p>rendered-body</p>'],
        ['.js-title', 'article-title'],
        ['.js-updated-at', '2000-01-01T00:00:00+00:00'],
        ['.js-coediting', ''],
        ['.js-private', ''],
      ])

      textSelectors.forEach((value, key: string) => {
        const el = tpl.querySelector(key)
        if (el === null) throw new Error(`${key} is not found!`)
        expect(el.textContent).toBe(value)
      })
    })

    it('should not render boolean type members', () => {
      const booleanSelectors = new Map<string, string>([
        ['.js-coediting', ''],
        ['.js-private', ''],
      ])

      booleanSelectors.forEach((value, key: string) => {
        const el = tpl.querySelector(key)
        if (el === null) throw new Error(`${key} is not found!`)
        expect(el.textContent).toBe(value)
      })
    })

    it('should have tags', () => {
      const el = tpl.querySelector('.js-tags')
      if (el === null) throw new Error('.js-tags is not found!')
      const items = el.querySelectorAll('li')
      expect(items.length).toBe(2)
      expect(items[0].innerText).toBe('tag-1')
      expect(items[1].innerText).toBe('tag-2')
    })
  })

  describe('subject config:', () => {
    it('should insert "人気の投稿" as a subject by default', () => {
      presenter.render()
      const subject = dest.querySelector('.js-subject')
      if (!(subject instanceof HTMLElement)) throw new Error('.js-subject is null!')
      expect(subject.innerText).toBe('人気の投稿')
    })

    it('should insert a custom subject if it is configured', () => {
      presenterConf = {
        subject: 'custom subject',
      }
      presenter = new QiitaPresenter(dest, items, presenterConf)
      presenter.render()
      const subject = dest.querySelector('.js-subject')
      if (!(subject instanceof HTMLElement)) throw new Error('.js-subject is null!')
      expect(subject.innerText).toBe('custom subject')
    })
  })

  describe('useTransition config:', () => {
    it('should modify class to enable transition by default', () => {
      presenter.render()
      expect(dest.classList.contains('is-no-transition')).toBe(false)
      expect(dest.classList.contains('is-qiita-widget-loaded')).toBe(true)
    })

    it('should modify class to disable transition if the useTransition option is false', () => {
      presenterConf = {
        useTransition: false,
      }
      presenter = new QiitaPresenter(dest, items, presenterConf)
      presenter.render()
      expect(dest.classList.contains('is-no-transition')).toBe(true)
      expect(dest.classList.contains('is-qiita-widget-loaded')).toBe(false)
    })
  })

  it('should find destination from the document if the dest option is null', () => {
    presenterConf = {
      userDest: '#alt-user-dest',
      articleDest: '#alt-article-dest',
    }
    presenter = new QiitaPresenter(null, items, presenterConf)
    presenter.render()

    expect(document.querySelector('#alt-user-dest .user-template')).toBeInstanceOf(HTMLElement)
    expect(document.querySelector('#alt-article-dest .article-template')).toBeInstanceOf(
      HTMLElement,
    )
  })

  it('should not change DOM if the destination is missing', () => {
    presenter = new QiitaPresenter(null, items, presenterConf)
    presenter.render()
    expect(document.querySelector('.user-template')).toBeNull()
    expect(document.querySelector('.article-template')).toBeNull()
  })

  it('should not change DOM if the template is missing', () => {
    presenterConf = {
      userTemplate: '#missing-user-template',
      articleTemplate: '#missing-article-template',
    }
    presenter = new QiitaPresenter(dest, items, presenterConf)
    presenter.render()
    expect(dest.querySelector('.user-template')).toBeNull()
    expect(dest.querySelector('.article-template')).toBeNull()
  })
})
