---
date: "2015-03-24T12:34:00+01:00"
title: "Beyond the Basics: Dependency Injection and the Model-View-Presenter pattern (part 1)"
path: "/words/dependency-injection-model-view-controller-pattern"
tags: dev
excerpt: I’ve been developing for Android on and off for just over a year now.
---

<p class="attention-grabber">I’ve been developing for Android on and off for just over a year now.</p>

I found it reasonably straightforward to make a start and built some fairly complex apps quite quickly. I wrote a [couple of](https://shaun.church/resources-for-android-development/) posts [about how I did it](https://shaun.church/why-is-that-web-dev-running-android-studio-4-months-on/).

Diving in and just starting to do stuff is great because it’s fun to get your hands dirty, and the sense of achievement when you build your first _’activity with a tabbed viewpager containing fragments with list views that have headers and footers’_ is very rewarding.

However, now I have a couple of apps that need maintaining this carefree style of just-make-it work becomes a burden. It’s time to figure out some better ways to do this stuff.

## Dependency Injection

The first item on the agenda was some kind of dependency injection. It’s easy to get caught up in dependency hell, where activities are creating instances of classes, which in turn create instances of classes which create adapters which update views which eventually have to figure out how to handle user interactions. Nothing is testable or easily swappable and everything is tied together with sticky string. Stuff will work, but it’s not going to be much fun to build upon in future.

I’ve heard good things about Dagger for dealing with this problem. After fiddling around a bit with Dagger 1 briefly, I took a look at Dagger 2 and the API immediately made a lot of sense to me. Using the [port of U2020-mvp to Dagger 2](https://github.com/LiveTyping/u2020-mvp) I was quickly able to pull together an example app and immediately begin to see the benefits of injection.

The Component/Module setup makes swapping out dependencies for debug, release and test variants very straightforward. There is a lot of setup code, so this might be overkill for simple apps, but the solid foundation this setup provides is almost certainly worth the effort for all but the smallest of projects.

## Model-View-Presenter pattern

Having worked in web development for over a decade I’m all too familiar with the need to separate concerns. On the web frameworks often follow the Model-View-Controller pattern, where controllers are the entry points which handle the business logic, wiring model data together with views, which themselves separate HTML from CSS presentation and interaction with Javascript.

While an identical approach doesn’t quite make sense on Android the [MVP pattern](http://antonioleiva.com/mvp-android/) targets similar outcomes.

The idea of both approaches is for each layer to be independent of the others, and for communication to happen over clearly defined interfaces. This manifests in a data model, a presenter, and a view. The presenter here fulfils a somewhat similar role to the controller in an MVC setup, requesting data from the data layer, formatting and figuring out how to supply it to the view. However, where a Controller in MVC is usually the entry point which decides which view is displayed, with MVP on Android the View is often the current Activity or Fragment. This means the view takes on some of the responsibility for kicking off requests for data, and then implements interfaces that the presenter can call to update the view.

## MVP-DI

These two patterns provide what appears to be a very flexible system for the basis of an application. Clear code separation and the modular dependency injection approach allow for testable, loosely coupled code, which can be easily swapped out, refactored, and tested without the overheads of navigating a maze of spaghetti.

## Sample project

I’m really only scratching the surface with this post, but I’ll share more in future as I work on building out my [base application](https://github.com/shaunchurch/AndroidPickings) that I plan to use as a foundation for future projects.

Testing and incorporating more complex views in to the MVP architecture are next on the agenda.

[Take a look at the sample app on Github](https://github.com/shaunchurch/AndroidPickings), and let me know what you’d do differently. I’m happy to hear any constructive criticism or discussions surrounding these techniques.
