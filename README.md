<div align="center">
  <img alt="Astro logo" src="https://mama-group.cz/astro-icon.svg" width="70" />
</div>
<h1 align="center">
  MaMa Group Web project
</h1>

The webpage uses [Astro framework](https://docs.astro.build) and it was built upon [Astro Citrus](https://github.com/ArtemKutsan/astro-citrus/) starter template. 

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/92c8309c-cbc0-4a8f-aa07-2ca6add734d5/deploy-status)](https://app.netlify.com/projects/mamagroup/deploys)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fmama-group.cz&style=flat&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNDkuNzEzMjQ5bW0iCiAgIGhlaWdodD0iNDEuNDI3OTU2bW0iCiAgIHZpZXdCb3g9IjAgMCA0OS43MTMyNDkgNDEuNDI3OTU2IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxIiAvPgogIDxnCiAgICAgaWQ9ImczIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMC45MTMwNDQsLTc4LjIxNzk5OSkiPgogICAgPHBhdGgKICAgICAgIGQ9Im0gNDUuNzMxNDE1LDEyMC4yMTM2MSBjIDAsLTExLjc3OTg4IDAsLTE3LjY2OTgxIC0yLjExMzU5LC0xOC44NzM2MyAtMi4xMTM1OSwtMS4yMDM4MSAtNC4yMjcxOSwzLjQ4MjI5IC03Ljc4NjgzLDguMTY4NDIgLTMuNTU5NjQsNC42ODYxMiAtNS4wMDU3LDQuNjg2MTIgLTguNTY5NTksLTAuMjExMjMgLTMuNTYzOSwtNC44OTczNSAtNS42ODE3NCwtOS43OTQ3MTUgLTcuODIzMTQsLTguNTkwOSAtMi4xNDEzOCwxLjIwMzgyIC0yLjE2NDkyLDcuMzA1MDEgLTIuMjEyMDEsMTkuNTA3MzQgTCA2LjYyMjI2NTIsMTIwLjQxNjEgViA3OC45ODgxNDUgSCAxOC4xMDM3MzUgbCAxMy41MDg3NCwyMi4wNDg3NzUgMTMuMTIzMjMsLTIyLjA0ODc3NSBoIDExLjQ4MTQ3IGwgMC4xMTgzNCw0MS40Mjc5NTUgeiIKICAgICAgIGlkPSJwYXRoMyIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMjkwNzc4OCwtMC43NzAxMzk3NikiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIiAvPgogIDwvZz4KPC9zdmc+Cg==)

# Docs
## Table Of Contents

0. [Before You Start...](#before-you-start)
1. [Technical Insight](#technical-insight)
2. [Quick start](#quick-start)
    - [Recommended steps](#recommended-steps)
3. [Project structure](https://github.com/MichalPt/astro-mamagroup-web/wiki/Project-structure) 
4. Tutorials
    - [How to create a news post](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-create-a-news-post)
    - [How to create a new event](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-create-a-new-event)
    - [How to create a custom banner](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-create-a-custom-banner)
    - [How to add a new course](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-add-a-new-course)
    - [How to add and edit group members](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-add-and-edit-group-members)
    - [How to add and edit outreach](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-add-and-edit-outreach)
    - [How to customize personal webpage](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-customize-personal-webpage)
    - [How to refresh list of publications](https://github.com/MichalPt/astro-mamagroup-web/wiki/How-to-refresh-list-of-publications)

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

## Before You Start...

To be able to contribute to the website (add or edit content, bug fix, add features, ...) you need a GitHub account. Also keep in mind, that any pull requests will need to be confirmed by one of the administrators of the GitHub repository before they get translated to the public website.

However, in order to experiment with the website you do not need to be logged in. Please follow the Quick start guide to set up a local server which can run the website locally for developmental purposes.

## Technical Insight

Hosting is currently provided free of charge using the Netlify service which automatically gets triggered by a new Git commit to this repository, rebuilds the page and uploads it to their server. The current status of the last build is visible on the Netlify badge in the introduction. 

The domain provided by Netlify ([mamagroup.netlify.app](https://mamagroup.netlify.app)) is linked by a canonical name (CNAME) DNS record, basically an alias, to a czech web domain [mama-group.cz](https://mama-group.cz) provided by czech domain provider WEDOS. The link has to be first set up on the WEDOS page "DNS records" after login (ask me or Tomáš for the credentials) and then confirmed from the side of Netlify to check security settings and obtain a HTTPS certificate.

## Quick start

In order to run, develop, and contribute to the website, you need to prepare a JavaScript (JS) website development environment first. There are several package managers available (npm, yarn, pnpm, ...) but I would recommend using the Performant Node Package Manager (pnpm). 

<!-- To install it on Linux or WSL (Windows Subsystem for Linux), type the following commands into your terminal (more installation options can be found in the [pnpm installation guide](https://pnpm.io/installation)): -->

<!-- ```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
``` -->

First, you need to have `Node.js` (JavaScript language runtime environment) installed. Please follow the official installation instructions at [`https://nodejs.org/en/download`](https://nodejs.org/en/download) that will install the package manager as well. I'd recommend selecting the "LTS" version of `Node.js` (currently v22.17.0), `nvm` (=node version manager), and `pnpm` (=performant node package manager).

> ***EXAMPLE:*** `Node.js` installation `v22.17.0 (LTS)` for `Linux` using `nvm` with `pnpm`:
> 
> ```bash
> # Download and install nvm:
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
> # in lieu of restarting the shell
> \. "$HOME/.nvm/nvm.sh"
> # Download and install Node.js:
> nvm install 22
> # Verify the Node.js version:
> node -v # Should print "v22.17.0".
> nvm current # Should print "v22.17.0".
> # Download and install pnpm:
> corepack enable pnpm
> ```

You can validate the installation of `pnpm` by running (you might need to restart the console first):

```bash
pnpm -v
```

> ***TROUBLESHOOTING:*** The `pnpm` can be also installed independent of the `Node.js`. However, you might than encounter a *"Sharp package not found."* error due to unproperly linked environments. You can install the `Node.js` after `pnpm` is already installed to resolve these errors. You need to to run the command `pnpm install` in the project root directory again to install missing packages and setup links properly.

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

> ***TROUBLESHOOTING:*** You might encounter the following error during the first attempt to run the local server:
>
> ```bash
> MissingSharp: Could not find Sharp. Please install Sharp (sharp) manually into your project or migrate to another image service.
> ```
>
> You can learn more about the error on the official [Astro website](https://docs.astro.build/en/reference/errors/missing-sharp/). In short, it is a result of stricter policies of the `pnpm` manager. To resolve it, you need to manually install the sharp package:
>
> ```bash
> sudo pnpm install sharp
> ```

Do not close the terminal window, the server is now running there. If you need to interact with the project (e.g. install new libraries as you are coding), open a new terminal and navigate to the project folder. 

The local server should be by default accessible through this address (eventually check the server logs as it is starting, you should find the default port number there):

[http://localhost:4321/](http://localhost:4321/)

Now you are basically a website developer! 🥳

Any changes you make to the code in the project repository will be, upon saving the files, visible in the website preview in the browser.  


### Recommended steps

#### 1. VSCode

A piece of software that I would greatly recommend for working on an Astro project is [Visual Studio Code](https://code.visualstudio.com/download). It supports all file formats you will be dealing with thanks to installable Astro extension and it has native GIT support. To set it up and link it with your GitHub account, follow the official [docs](https://code.visualstudio.com/docs) and install the [Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).


#### 2. `.env` file

In order to be able to locally preview freshly fetched lists of publications from ORCID (e.g. [mama-group.cz/mancal/publications/](https://mama-group.cz/mancal/publications/)), you need to create an ORCID account first, fill in an application to access developer tools, and generate an [API access token](https://orcid.org/developer-tools) for [ORCID Public API](https://info.orcid.org/ufaqs/how-do-i-register-a-public-api-client/). To get the token, use the terminal commands listed in the bottom of the ORCID developer tools webpage or use this template command:

```bash
curl -X "POST" "https://orcid.org/oauth/token" -H "Accept: application/json" -d "client_id=APP-XXXXXXXXXXXXXXXX&client_secret=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&grant_type=client_credentials&scope=/read-public"
```

where you replace the `XXX...` with **Client ID** and **Client secret**. Once you have the token, create a `/src/.env` text file with the following content:

```
ORCID_ACCESS_TOKEN = "XXX"
```

where you replace `XXX` with your (32-digit) token. 

> ***NOTE:*** You can still edit and send pull requests of your code even **without** having the `.env` file and generating the API access token. The `.env` file is included in the `.gitignore` file for security reasons but the access token that is actually used for building and deploying the website to Netlify is the one affiliated to me and my e-mail (MP). The token is securely stored on GitHub as a *secret environment variable* of the project and on the Netlify server as a *projecct variable*. 

To sum up, by skipping this optional step you won't be able to locally preview freshly fetched lists of publications. But the deployed website will still work in this respect.

> ***NOTE:*** If the fetching from the ORCID database fails, the list will by default source a cached list of publications from the last successful fetch (timestamp can be visible in the header of the webpage). Tha cached JSON files are saved in `/src/content/publications/` and named by the ORCID ID.

<!-- ### Basic pnpm Commands

| Command          | Action                                                         |
| :--------------- | :------------------------------------------------------------- |
| `pnpm install`   | Installs dependencies listed in the `package.json` file (managed by Astro framework)  |
| `pnpm dev`       | Starts local dev server at `localhost:4321`                    |
| `pnpm build`     | Build your production site to `./dist/`                        |
| `pnpm postbuild` | Pagefind script to build the static search of your blog posts  |
| `pnpm preview`   | Preview your build locally, before deploying                   |
| `pnpm sync`      | Generate types based on your config in `src/content/config.ts` | -->

---

**For more detailed information about the website including tutorials and "How to ..." please visit the [wiki page](https://github.com/MichalPt/astro-mamagroup-web/wiki) of this GitHub project.**
