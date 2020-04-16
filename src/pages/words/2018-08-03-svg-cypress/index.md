---
date: "2018-08-03T20:21:00+01:00"
title: "Bizarre browser behaviour: SVG in the Cypress Tree"
path: "/words/bbb-svg-cypress"
tags: dev, testing
excerpt: Pain is relative. Things are getting better.
---

I have a love/hate relationship with SVGs.

They're wonderful. They're annoying.

Occasionally I catch myself becoming frustrated with some of the issues I've run into while using them. Then I remind myself what it was like before browsers had reasonable SVG support, when I'd have been using images or icon fonts. Pain is relative.

Today I ran into an interesting issue doing some break point testing of a navigation menu with [Cypress.io](https://cypress.io). Once again an SVG was centre stage in an episode of _bizarre browser behaviour_.

## Click Test

I have a menu bar. It has icons with labels at large screen sizes. On smaller screens the labels disappear leaving only the SVG icon.

I wanted Cypress to test the menu and navigation on a selection of screen sizes from 320px to 1920px.

This is easy to do by looping over an array of width, height pairs inside the test, each time setting the screen size with `cy.viewport()` before clicking the buttons:

```javascript
it("clicks the button", () => {
  screens.forEach((screen) => {
    cy.viewport(screen[0], screen[1]);
    cy.get(buttonSelector).click();
  });
});
```

This worked fine at higher resolutions, but failed with a nasty error as soon as the navigation labels beside the SVG icons disappeared on smaller displays.

```
CypressError: Timed out retrying: illegal invocation
```

_*Interesting.*_

## Hmmm...

Inspecting the element gave no clues, and I could still click the element manually even inside the Cypress UI.

Putting a label beside the icon made the test pass. Removing the label made it fail. It was quite peculiar. A label by itself would pass. The icon by itself would fail. The icon and the label would pass.

Any other sibling element made the test pass. A solitary SVG would always fail. Unclickable.

I turned to Google. There was a [test case filed in an issue on Github](https://github.com/cypress-io/cypress/issues/2258)! This always inspires a feeling of camaraderie.

_Someone knows my pain!_

It turns out a [bug in Cypress](https://github.com/cypress-io/cypress/issues/2258) caused any SVG or _any element containing *only* an SVG_ to become _unclickable_.

[The fix](https://github.com/cypress-io/cypress/pull/2246) is in the next release which is, amusingly, due out just as I discover I need it.

It wasn't really the SVG's fault at all. It was framed.

Testing with Cypress is so pain free that it really hurts when you do run in to a strange issue. I reminded myself of all the trouble I had trying to drive Selenium with JavaScript.

This is nothing.

Pain is relative.
