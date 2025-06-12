# json from api
```
{
  "data": [
    {
      "id": 1,
      "slug": "aa",
      "title": "a",
      "description": "aasfsdafsda",
      "category": "a",
      "date": "2025-06-03",
      "image": "artikel-thumbnails/01JX4Y5TYJQ5HAMBC92E1BFNE0.png",
      "content": [
        {
          "title": "adfdasf",
          "paragraphs": "aadfdasfsad",
          "bulletPoints": "aasdfsdfsda"
        }
      ],
      "related_articles": [
        {
          "title": "d12312312"
        }
      ],
      "created_at": "2025-06-07T10:14:57.000000Z",
      "updated_at": "2025-06-12T13:17:34.000000Z"
    },
    {
      "id": 2,
      "slug": "article-1-for-digital-marketing",
      "title": "Article 1 for Digital Marketing",
      "description": "Description for Article 1 for Digital Marketing",
      "category": "Digital Marketing",
      "date": "2025-06-12",
      "image": "artikel-thumbnails/default.png",
      "content": [
        {
          "title": "Section 1",
          "paragraphs": "Sample content for Article 1 for Digital Marketing",
          "bulletPoints": "- Point 1\n- Point 2\n- Point 3"
        }
      ],
      "related_articles": [
        {
          "title": "Related article 1"
        }
      ],
      "created_at": "2025-06-12T13:45:38.000000Z",
      "updated_at": "2025-06-12T13:45:38.000000Z"
    },
    {
      "id": 3,
      "slug": "article-2-for-digital-marketing",
      "title": "Article 2 for Digital Marketing",
      "description": "Description for Article 2
      ...
```
# project structure
```
.
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── node_modules
│   ├── acorn
│   ├── acorn-jsx
│   ├── ajv
│   ├── @alloc
│   ├── ansi-styles
│   ├── argparse
│   ├── aria-query
│   ├── array-buffer-byte-length
│   ├── arraybuffer.prototype.slice
│   ├── array-includes
│   ├── array.prototype.findlast
│   ├── array.prototype.findlastindex
│   ├── array.prototype.flat
│   ├── array.prototype.flatmap
│   ├── array.prototype.tosorted
│   ├── ast-types-flow
│   ├── async-function
│   ├── autoprefixer
│   ├── available-typed-arrays
│   ├── axe-core
│   ├── axobject-query
│   ├── balanced-match
│   ├── brace-expansion
│   ├── braces
│   ├── browserslist
│   ├── busboy
│   ├── call-bind
│   ├── call-bind-apply-helpers
│   ├── call-bound
│   ├── callsites
│   ├── caniuse-lite
│   ├── chalk
│   ├── class-variance-authority
│   ├── client-only
│   ├── clsx
│   ├── color
│   ├── color-convert
│   ├── color-name
│   ├── color-string
│   ├── concat-map
│   ├── cross-spawn
│   ├── csstype
│   ├── damerau-levenshtein
│   ├── data-view-buffer
│   ├── data-view-byte-length
│   ├── data-view-byte-offset
│   ├── debug
│   ├── deep-is
│   ├── define-data-property
│   ├── define-properties
│   ├── detect-libc
│   ├── doctrine
│   ├── dunder-proto
│   ├── electron-to-chromium
│   ├── @emnapi
│   ├── emoji-regex
│   ├── enhanced-resolve
│   ├── es-abstract
│   ├── escalade
│   ├── escape-string-regexp
│   ├── es-define-property
│   ├── es-errors
│   ├── es-iterator-helpers
│   ├── @eslint
│   ├── eslint
│   ├── @eslint-community
│   ├── eslint-config-next
│   ├── eslint-import-resolver-node
│   ├── eslint-import-resolver-typescript
│   ├── eslint-module-utils
│   ├── eslint-plugin-import
│   ├── eslint-plugin-jsx-a11y
│   ├── eslint-plugin-react
│   ├── eslint-plugin-react-hooks
│   ├── eslint-scope
│   ├── eslint-visitor-keys
│   ├── es-object-atoms
│   ├── espree
│   ├── esquery
│   ├── esrecurse
│   ├── es-set-tostringtag
│   ├── es-shim-unscopables
│   ├── es-to-primitive
│   ├── estraverse
│   ├── esutils
│   ├── fast-deep-equal
│   ├── fast-glob
│   ├── fast-json-stable-stringify
│   ├── fast-levenshtein
│   ├── fastq
│   ├── file-entry-cache
│   ├── fill-range
│   ├── find-up
│   ├── flat-cache
│   ├── flatted
│   ├── for-each
│   ├── fraction.js
│   ├── function-bind
│   ├── function.prototype.name
│   ├── functions-have-names
│   ├── get-intrinsic
│   ├── get-proto
│   ├── get-symbol-description
│   ├── get-tsconfig
│   ├── globals
│   ├── globalthis
│   ├── glob-parent
│   ├── gopd
│   ├── graceful-fs
│   ├── graphemer
│   ├── has-bigints
│   ├── has-flag
│   ├── hasown
│   ├── has-property-descriptors
│   ├── has-proto
│   ├── has-symbols
│   ├── has-tostringtag
│   ├── @humanfs
│   ├── @humanwhocodes
│   ├── ignore
│   ├── @img
│   ├── import-fresh
│   ├── imurmurhash
│   ├── internal-slot
│   ├── isarray
│   ├── is-array-buffer
│   ├── is-arrayish
│   ├── is-async-function
│   ├── is-bigint
│   ├── is-boolean-object
│   ├── is-bun-module
│   ├── is-callable
│   ├── is-core-module
│   ├── is-data-view
│   ├── is-date-object
│   ├── isexe
│   ├── is-extglob
│   ├── is-finalizationregistry
│   ├── is-generator-function
│   ├── is-glob
│   ├── is-map
│   ├── is-number
│   ├── is-number-object
│   ├── is-regex
│   ├── is-set
│   ├── is-shared-array-buffer
│   ├── is-string
│   ├── is-symbol
│   ├── is-typed-array
│   ├── is-weakmap
│   ├── is-weakref
│   ├── is-weakset
│   ├── iterator.prototype
│   ├── jiti
│   ├── json5
│   ├── json-buffer
│   ├── json-schema-traverse
│   ├── json-stable-stringify-without-jsonify
│   ├── js-tokens
│   ├── jsx-ast-utils
│   ├── js-yaml
│   ├── keyv
│   ├── language-subtag-registry
│   ├── language-tags
│   ├── levn
│   ├── lightningcss
│   ├── lightningcss-linux-x64-gnu
│   ├── lightningcss-linux-x64-musl
│   ├── locate-path
│   ├── lodash.merge
│   ├── loose-envify
│   ├── lucide-react
│   ├── math-intrinsics
│   ├── merge2
│   ├── micromatch
│   ├── minimatch
│   ├── minimist
│   ├── ms
│   ├── nanoid
│   ├── @napi-rs
│   ├── natural-compare
│   ├── @next
│   ├── next
│   ├── @nodelib
│   ├── node-releases
│   ├── @nolyfill
│   ├── normalize-range
│   ├── object-assign
│   ├── object.assign
│   ├── object.entries
│   ├── object.fromentries
│   ├── object.groupby
│   ├── object-inspect
│   ├── object-keys
│   ├── object.values
│   ├── optionator
│   ├── own-keys
│   ├── parent-module
│   ├── path-exists
│   ├── path-key
│   ├── path-parse
│   ├── picocolors
│   ├── picomatch
│   ├── p-limit
│   ├── p-locate
│   ├── possible-typed-array-names
│   ├── postcss
│   ├── postcss-value-parser
│   ├── prelude-ls
│   ├── prop-types
│   ├── punycode
│   ├── queue-microtask
│   ├── @radix-ui
│   ├── react
│   ├── react-dom
│   ├── react-is
│   ├── reflect.getprototypeof
│   ├── regexp.prototype.flags
│   ├── resolve
│   ├── resolve-from
│   ├── resolve-pkg-maps
│   ├── reusify
│   ├── @rtsao
│   ├── run-parallel
│   ├── @rushstack
│   ├── safe-array-concat
│   ├── safe-push-apply
│   ├── safe-regex-test
│   ├── scheduler
│   ├── semver
│   ├── set-function-length
│   ├── set-function-name
│   ├── set-proto
│   ├── sharp
│   ├── shebang-command
│   ├── shebang-regex
│   ├── side-channel
│   ├── side-channel-list
│   ├── side-channel-map
│   ├── side-channel-weakmap
│   ├── simple-swizzle
│   ├── source-map-js
│   ├── stable-hash
│   ├── streamsearch
│   ├── string.prototype.includes
│   ├── string.prototype.matchall
│   ├── string.prototype.repeat
│   ├── string.prototype.trim
│   ├── string.prototype.trimend
│   ├── string.prototype.trimstart
│   ├── strip-bom
│   ├── strip-json-comments
│   ├── styled-jsx
│   ├── supports-color
│   ├── supports-preserve-symlinks-flag
│   ├── @swc
│   ├── @tailwindcss
│   ├── tailwindcss
│   ├── tailwind-merge
│   ├── tapable
│   ├── tinyglobby
│   ├── to-regex-range
│   ├── ts-api-utils
│   ├── tsconfig-paths
│   ├── tslib
│   ├── tw-animate-css
│   ├── @tybys
│   ├── type-check
│   ├── typed-array-buffer
│   ├── typed-array-byte-length
│   ├── typed-array-byte-offset
│   ├── typed-array-length
│   ├── @types
│   ├── typescript
│   ├── @typescript-eslint
│   ├── unbox-primitive
│   ├── undici-types
│   ├── @unrs
│   ├── unrs-resolver
│   ├── update-browserslist-db
│   ├── uri-js
│   ├── which
│   ├── which-boxed-primitive
│   ├── which-builtin-type
│   ├── which-collection
│   ├── which-typed-array
│   ├── word-wrap
│   └── yocto-queue
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── author-1.png
│   ├── author-2.png
│   ├── author-3.png
│   ├── author-4.png
│   ├── author-5.png
│   ├── author-6.png
│   ├── author-7.png
│   ├── author-8.png
│   ├── book.svg
│   ├── browser.svg
│   ├── ddos.svg
│   ├── facebook.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── group.png
│   ├── hacking.svg
│   ├── hands.png
│   ├── instagram.svg
│   ├── keyboard.svg
│   ├── linkedin.svg
│   ├── link.svg
│   ├── logo.svg
│   ├── next.svg
│   ├── nlp.svg
│   ├── notes.svg
│   ├── overview.png
│   ├── search.svg
│   ├── sparkle.svg
│   ├── timer.svg
│   ├── twitter.svg
│   ├── vercel.svg
│   ├── video.svg
│   ├── whatsapp.svg
│   ├── window.svg
│   ├── wordle.svg
│   └── youtube.svg
├── README.md
├── src
│   ├── app
│   ├── components
│   ├── lib
│   └── pages
├── tailwind.config.js
└── tsconfig.json
```

# fetch route
```api.php
Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{id}', [ArtikelController::class, 'show']);
Route::apiResource('artikel', ArtikelController::class);
```
base_url: localhost:8000

use .env.local file for base url

# Instructions
read lib/articles.ts and compare that with json api output then implement it to src/app/blog/[id]/page.tsx
and /src/components/Home.tsx

read also
entire src/app/panduan and src/app/tips

show only match categories from article



DONT UPDATE UI

