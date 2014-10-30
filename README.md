# GoCardless API Docs

View API Docs: https://developer.gocardless.com

---

## Running locally

```bash
npm install
npm start
```

---

## TOC Ordering

Pages are ordered by sorting a concatenated string
constructed from the folder tree plus the file name.

Example:
```
/source/docs/01_resources/01_bill/01_overview.md > "01_resources02_bill01_overview.md"
/source/docs/01_resources/02_merchant/01_overview.md > "01_resources002_merchant01_overview.md"
```


## TOC Construction

The navigation tree is built by parsing the headings on the rendered page.

- `h0` represents a nav section header (e.g. "API")
- `h1` represents a top level item in the nav (e.g. "Bill")
- `h2` represents a sub resource (e.g. "Create a one-off bill")

This means you need to make sure the pages and their heading levels are
ordered in the right way within the docs folder.

**The folder tree does not change the navigation nesting**

Example:

```html
<h0>API</h0>
<h1>Overview</h1>
<h0>Resource</h0>
<h1>Bill</h1>
<h2>Create one-off bill</h2>
```

Would render:

```html
<ul>
  <li>
    <span>API</span>
    <ul>
      <li><a href>Overview</a></li>
    </ul>
  </li>
  <li>
    <span>Resources</span>
    <ul>
      <li>
        <a href>Bill</a>
        <ul>
          <li><a href>Create one-off bill</a></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

If the heading levels are out of order the navigation nesting will break.
For example, if page ordering ends up putting the `h2` before the `h1`
for the same resource.

---

## Code samples

**The default language is HTTP**

Article independent code samples must be placed in a `code` folder in the
article folder.

Name the code examples using the appropriate `extname` from `./data/languages.json`


## Code articles

**The default language is HTTP**

Entire pages can be shown for specific languages by adding the
language `extname` to the filename.

Example:
- Only show for Ruby `getting_started.rb.md`
- Show default (HTTP): `getting_started.http.md`

The appropriate `extname` can be found in `./data/languages.json`
