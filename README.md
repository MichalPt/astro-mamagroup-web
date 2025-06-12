<div align="center">
  <img alt="Astro logo" src="/public/astro-icon.svg" width="70" />
</div>
<h1 align="center">
  MaMa Group Web project
</h1>

The webpage uses [Astro framework](https://docs.astro.build) and it was built upon [Astro Citrus](https://github.com/ArtemKutsan/astro-citrus/) starter template. 

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/92c8309c-cbc0-4a8f-aa07-2ca6add734d5/deploy-status)](https://app.netlify.com/projects/mamagroup/deploys)



# Docs
## Table Of Contents

1. [Key Features](#key-features)
2. [Demo](#demo)
3. [Quick start](#quick-start)
4. [Preview](#preview)
5. [Commands](#commands)
6. [Configure](#configure)
7. [Updating](#updating)
8. [Adding posts and notes](#adding-posts-and-notes)
   - [Post Frontmatter](#post-frontmatter)
   - [Note Frontmatter](#note-frontmatter)
   - [Frontmatter Snippet](#frontmatter-snippet)
9. [Pagefind search](#pagefind-search)
10. [Analytics](#analytics)
11. [Deploy](#deploy)
12. [Acknowledgment](#acknowledgment)

<!-- ## Key Features

- Astro v5 Fast 🚀
- TailwindCSS Utility classes
- Accessible, semantic HTML markup
- Responsive & SEO-friendly
- Dark / Light mode, using Tailwind and CSS variables
- MD & [MDX](https://docs.astro.build/en/guides/markdown-content/#mdx-only-features) posts & notes
  - Includes [Admonitions](http://astrocitrus.artemkutsan.pp.ua/posts/markdown-elements/admonistions/)
- [Satori](https://github.com/vercel/satori) for creating open graph png images
- [Automatic RSS feed](https://docs.astro.build/en/guides/rss)
- [Webmentions](https://webmention.io/)
- Auto-generated:
  - [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
  - [robots.txt](https://github.com/alextim/astro-lib/blob/main/packages/astro-robots-txt/README.md)
  - [web app manifest](https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md)
- [Pagefind](https://pagefind.app/) static search library integration
- [Astro Icon](https://github.com/natemoo-re/astro-icon) svg icon component
- [Rehype Pretty Code](https://rehype-pretty.pages.dev/) code blocks and syntax highlighter -->

## Before You Start ...

To be able to contribute to the website (add or edit content, bug fix, add features, ...) you need a GitHub account. Also keep in mind, that any pull requests will need to be confirmed by one of the administrators of the GitHub repository before they get translated to the public website.

However, in order to experiment with the website you do not need to be logged in. Please follow the Quick start guide to set up a local server which can run the website locally for developmental purposes.

## Technical Insight

Hosting is currently provided free of charge using the Netlify service which automatically gets triggered by a new Git commit to this repository, rebuilds the page and uploads it to their server. The current status of the last build is visible on the Netlify badge in the introduction. 

The domain provided by Netlify ([mamagroup.netlify.app](https://mamagroup.netlify.app)) is linked by a canonical name (CNAME) DNS record, basically an alias, to a czech web domain [mama-group.cz](https://mama-group.cz) provided by czech domain provider WEDOS. The link has to be first set up on the WEDOS page "DNS records" after login (ask me or Tomáš for the credentials) and then confirmed from the side of Netlify to check security settings and obtain a HTTPS certificate.

## Quick start

In order to run, develop, and contribute to the website, you need to prepare a JavaScript (JS) website development environment first. There are several package managers available (npm, yarn, pnpm, ...) but I would recommend using Performant Node Package Manager (pnpm) since it is the newest one. 

To install it on Linux or WSL (Windows Subsystem for Linux), type the following commands into your terminal (more installation options can be found in the [pnpm installation guide](https://pnpm.io/installation)):

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

You can validate the installation by running (you might need to restart the console first to load the updated `$PATH` variable):

```bash
pnpm -v
```

Additionally, you will also need GIT. If you don't have it installed yet (you can check with `git --version`), install it using your package manager, e.g. `sudo apt install git`. 

Now navigate into a folder where you want to store the project and run:

```bash
git clone https://github.com/MichalPt/astro-mamagroup-web.git
```

The entire project now gets downloaded into your folder. Navigate into the project folder and install all project dependencies (this might take some time ...):

```bash
cd astro-mamagroup-web
pnpm install
```

Once all dependencies are successfuly installed, you can start the developmental server to view the webpage (you still need to be in the downloaded project folder):

```bash
pnpm dev
```

Do not close the terminal window, the server is now running there. If you need to interact with the project (e.g. install new libraries as you are coding), open a new terminal and navigate to the project folder. 

The local server should be by default accessible through this address (eventually check the server logs as it is starting, you should find the defaulted port number there):

[http://localhost:4321/](http://localhost:4321/)

Now you are basically a website developer! 🥳

Any changes you make to the code in the project repository will be, upon saving the files, visible in the website preview in the browser.  

### Recommended steps

#### 1. VSCode

A piece of software that I would greatly rcommend for working on an Astro project is [Visual Studio Code](https://code.visualstudio.com/download). It supports all file formats you will be dealing with thanks to installable Astro extension and it has native GIT support. To set it up and link it with your GitHub account, follow the official [docs](https://code.visualstudio.com/docs) and install the [Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).


#### 2. `.env` file

In order to be able to locally build and display the pages that include automatically fetched lists of publications from ORCID (e.g. [mama-group.cz/mancal/publications/](https://mama-group.cz/mancal/publications/)), you need to create an ORCID account first, fill in an application to access developer tools, and generate an [API access token](https://orcid.org/developer-tools) for [ORCID Public API](https://info.orcid.org/ufaqs/how-do-i-register-a-public-api-client/). To get the token, use the terminal commands listed in the bottom of the ORCID developer tools webpage or use this template command:

```bash
curl -X "POST" "https://orcid.org/oauth/token" -H "Accept: application/json" -d "client_id=APP-XXXXXXXXXXXXXXXX&client_secret=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&grant_type=client_credentials&scope=/read-public"
```

where you replace the `XXX...` with **Client ID** and **Client secret**. Once you have the token, create a `.env` text file in the root folder with the following content:

```
ORCID_ACCESS_TOKEN = "XXX"
```

where you replace `XXX` with your (32-digit) token. 

You can still edit and send pull requests of your code even **without** having the `.env` file and generating the API access token. The `.env` file is included in the `.gitignore` file for security reasons but the access token that is actually used for building and deploying the website to Netlify is securely stored on GitHub as a *secret environment variable* of the project. To sum up, by skipping this voluntary step you just won't be able to locally preview the pages with lists of publications. But the deployed website will still work in this respect.

<!-- ### Basic pnpm Commands

| Command          | Action                                                         |
| :--------------- | :------------------------------------------------------------- |
| `pnpm install`   | Installs dependencies listed in the `package.json` file (managed by Astro framework)  |
| `pnpm dev`       | Starts local dev server at `localhost:4321`                    |
| `pnpm build`     | Build your production site to `./dist/`                        |
| `pnpm postbuild` | Pagefind script to build the static search of your blog posts  |
| `pnpm preview`   | Preview your build locally, before deploying                   |
| `pnpm sync`      | Generate types based on your config in `src/content/config.ts` | -->

## Structure of the Project

In root folder of the project (`/astro-mamaweb`) you can find the following files and folders:

| File/Folder | Description | 
| :--- | :--- |
| `/src` | Structured source folder used to build the website |
| `/public` | Folder for files and images that will be publicly accessible on the website |
| `.gitignore` | Hidden file specifying files that are not being tracked by GIT, and hence stored on GitHub |
| `.env` | (You must create it first!) Hidden file containig environment variables for the project (e.g. the ORCID access token), included in `.gitignore` |
| `astro.config.ts` | *Config file for the Astro framework (e.g. the favicon for Google, redirects within the website, or the domain are specified here) |
| `tailwind.config.ts` | *Config file for Tailwind CSS library |
| `netlify.toml` | *Command file for the Netlify service |
| `package.json` | *Project dependencies, created by the package manager |
| `postcss.config.cjs` | *Config file for PostCSS library |
| `README.md` | The documentation you are now reading in Markdown format |
| other | *Some unimportant config files |

**Files highlighted with an asterisk (*) should not be edited until you know what you are doing or you have a good reason for it!**

In order to be able to locally build and display the pages that include automatically fetched lists of publications from ORCID (e.g. [mama-group.cz/mancal/publications](https://mama-group.cz/mancal/publications)) you need to create an account there and generate an API access token. Once you have it, create the `.env` text file in the root folder with the following content:

```
ORCID_ACCESS_TOKEN = "XXX"
```

where you replace `XXX` with your (32-digit) token. You can still edit, develop and send pull requests of your code even without having created the `.env` file, creating ORCID account and generating API access token since my access token is securely stored on GitHub and used for the actual deployment of the website to Netlify server. You just won't be able to locally preview the pages with lists of publications.


The `/src` folder has the following structure:

| File/Folder | Description | 
| :--- | :--- |
| `/assets` | Images used to build the website (logos, etc.) |
| `/components` | Bits and pieces of websites that can be used multiple times |
| `/content` | Content for News (`/content/news`), custom personal webpages of group members (`/content/custom`), or definition of the group (`/contents/group.json`) |
| `/data` | ? |
| `/layouts` | Main layouts of the pages |
| `/pages` | !!! The tree structure of this folder directly translates into the webpage tree !!! The webpages themselves |
| `/plugins` | Folder for script files based on plugins |
| `/scripts` | Scripts that are used on multiple places of the website |
| `/styles` | Folder for CSS styles |
| `/utils` | Folder for small handy scripts |
| `content.config.ts` | Config file |
| `site.config.ts` | Config file |
| other |  |

**IMPORTANT** - do NOT rename the `/src` subfolders! Their names need to be like this to get properly recognized by Astro and its plugins and integrations.


## Some important folders and structure of their content

### Folder `/content`

The content folder is the one a contributor to the website will be interacting with the most often. It contains all the input JSON files that are sourced to create parts of the website like courses (`/mancal-teaching`, `/maly-teaching`), news (`/news`), events (`/events`), outreach (`/mancal-outreach`), or members of the group (`group.json`) and files to customize their personal profile website (`/custom`).


### Folder `/pages`




<!-- 
## Configure

- Edit the config file `src/site.config.ts` for basic site meta data
- Update file `astro.config.ts`
  - **Important**: the site property with your own domain.
  - [astro-webmanifest options](https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md)
- Replace & update files within the `/public` folder:
  - icon.svg - used as the source to create favicons & manifest icons
  - social-card.png - used as the default og:image
- Modify file `src/styles/global.css` with your own light and dark styles.
  - You can also modify the theme(s) for markdown code blocks generated by [Rehype Pretty Code](https://rehype-pretty.pages.dev/). Astro Citrus has both a dark (rose-pine) and light (rose-pine-dawn) theme, which can be found in `src/site.config.ts`. You can find more theme(s) and options [here](https://shiki.matsu.io/).
- Edit social links in `src/components/SocialList.astro` to add/replace your media profile. Icons can be found @ [icones.js.org](https://icones.js.org/), per [Astro Icon's instructions](https://www.astroicon.dev/guides/customization/#find-an-icon-set).
- Create/edit posts & notes for your blog within `src/content/post/` & `src/content/note/` with .md/mdx file(s). See [below](#adding-posts-and-notes) for more details.
  - Read [this post](http://astrocitrus.artemkutsan.pp.ua/posts/webmentions/) for adding webmentions to your site.
- OG Image:
  - If you would like to change the style of the generated image the Satori library creates, open up `src/pages/og-image/[slug].png.ts` to the markup function where you can edit the html/tailwind-classes as necessary. You can use this [playground](https://og-playground.vercel.app/) to aid your design.
  - You can also create your own og images and skip satori generating it for you by adding an ogImage property in the frontmatter with a link to the asset, an example can be found in `src/content/post/social-image.md`. More info on frontmatter can be found [here](#frontmatter)
- Optional:
  - Fonts: This theme sets the body element to the font family `font-mono`, located in the global css file `src/styles/global.css`. You can change fonts by removing the variant `font-mono`, after which TailwindCSS will default to the `font-sans` [font family stack](https://tailwindcss.com/docs/font-family).

## Updating

If you've forked the template, you can [sync the fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) with your own project, remembering to **not** click Discard Changes as you will lose your own.

If you have a template repository, you can add this template as a remote, as discussed [here](https://stackoverflow.com/questions/56577184/github-pull-changes-from-a-template-repository).

## Adding posts and notes

This theme utilises [Content Collections](https://docs.astro.build/en/guides/content-collections/) to organise local Markdown and MDX files, as well as type-checking frontmatter with a schema -> `src/content/config.ts`.

Adding a post/note is as simple as adding your .md(x) files to the `src/content/post` and/or `src/content/note` folder, the filename of which will be used as the slug/url. The posts included with this template are there as an example of how to structure your frontmatter. Additionally, the [Astro docs](https://docs.astro.build/en/guides/markdown-content/) has a detailed section on markdown pages.

### Post Frontmatter

| Property (\* required) | Description |
|------------------------|-------------|
| **title \***          | Self-explanatory. Used as the text link to the post, the h1 on the post's page, and the page's title property. Has a max length of 60 chars, set in `src/content/config.ts`. |
| **description \***    | Similar to above, used as the SEO description property. Has a min length of 50 and a max length of 160 chars, set in the post schema. |
| **publishDate \***    | Again, pretty simple. To change the date format/locale, currently **en-GB**, update the date option in `src/site.config.ts`. Note you can also pass additional options to the `<FormattedDate>` component if required. |
| **updatedDate**       | This is an optional date representing when a post has been updated, in the same format as the `publishDate`. |
| **seriesId**          | An optional property that groups posts into a series. Posts with the same `seriesId` are considered part of the same series and can be displayed together in order. This allows for better organization of related content. |
| **orderInSeries**     | A numeric value defining the position of a post within a series. Lower values indicate earlier posts in the series, while higher values appear later. Used for sorting and navigation between posts within the same series. |
| **tags**             | Tags are optional with any created post. Any new tag(s) will be shown in `yourdomain.com/posts` & `yourdomain.com/tags`, and generate the page(s) `yourdomain.com/tags/[yourTag]`. |
| **coverImage**       | This is an optional object that will add a cover image to the top of a post. Include both `src`: "_path-to-image_" and `alt`: "_image alt_". You can view an example in `src/content/post/cover-image.md`. |
| **ogImage**          | This is an optional property. An OG Image will be generated automatically for every post where this property **isn't** provided. If you would like to create your own for a specific post, include this property and a link to your image, the theme will then skip automatically generating one. |
| **draft**            | This is an optional property as it is set to `false` by default in the schema. By setting it to `true`, the post will be filtered out of the production build in a number of places, including `getAllPosts()` calls, OG images, RSS feeds, and generated page[s]. You can view an example in `src/content/post/draft-post.md`. |


### Note Frontmatter

| Property (\* required) | Description                                        |
| ---------------------- | -------------------------------------------------- |
| title \*               | string, max length 60 chars.                       |
| description            | to be used for the head meta description property. |
| publishDate \*         | ISO 8601 format with offsets allowed.              |

### Frontmatter snippet

Astro Citrus includes a helpful VSCode snippet which creates a frontmatter 'stub' for posts and note's, found here -> `.vscode/post.code-snippets`. Start typing the word `frontmatter` on your newly created .md(x) file to trigger it. Visual Studio Code snippets appear in IntelliSense via (⌃Space) on mac, (Ctrl+Space) on windows.

## Pagefind search

This integration brings a static search feature for searching blog posts and notes. In its current form, pagefind only works once the site has been built. This theme adds a postbuild script that should be run after Astro has built the site. You can preview locally by running both build && postbuild.

Search results only includes pages from posts and notes. If you would like to include other/all your pages, remove/re-locate the attribute `data-pagefind-body` to the article tag found in `src/layouts/BlogPost.astro` and `src/components/note/Note.astro`.

It also allows you to filter posts by tags added in the frontmatter of blog posts. If you would rather remove this, remove the data attribute `data-pagefind-filter="tag"` from the link in `src/components/blog/Masthead.astro`.

If you would rather not include this integration, simply remove the component `src/components/Search.astro`, and uninstall both `@pagefind/default-ui` & `pagefind` from package.json. You will also need to remove the postbuild script from here as well.

You can reduce the initial css payload of your css, as demonstrated [here](https://github.com/artemkutsan/astro-citrus/pull/145#issue-1943779868), by lazy loading the web components styles.


## Deploy

[Astro docs](https://docs.astro.build/en/guides/deploy/) has a great section and breakdown of how to deploy your own Astro site on various platforms and their idiosyncrasies.

By default the site will be built (see [Commands](#commands) section above) to a `/dist` directory.

## Acknowledgment

The project is build on the [Astro Citrus](https://github.com/ArtemKutsan/astro-citrus/) template by Artem Kutsan which was inspired by [Astro Theme Cactus](https://github.com/chrismwilliams/astro-theme-cactus) by [Chriss Williams](https://github.com/chrismwilliams).

## License

MIT -->
