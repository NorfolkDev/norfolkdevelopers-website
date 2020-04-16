---
date: "2014-03-29T07:41:00+01:00"
title: "Resources for learning Android development"
path: "/words/resource-for-learning-android-development"
tags: dev
excerpt: A big collection of resources, tutorials and libraries I found useful for getting started quickly with Android.
---

A big collection of resources, tutorials and libraries I found useful for getting started quickly with Android.

Over the last few weeks I’ve been [trying my hand at Android development](https://www.shaunchurch.com/why-is-that-web-dev-running-android-studio/), with some success.

There are a lot of learning resources available, however I have found it tough to find comprehensive code examples rather than incomplete snippets. As a novice it can be hard to understand what's happening when no context is provided.

Visual presentation can sometimes fall behind what I’ve come to expect from web development and JavaScript documentation and tutorials. I didn’t realise quite how good we have it in web land — these days, more often than not documentation is well designed and presented in a clear and readable way.

This is a list of the best tutorials, articles, documentation and resources I’ve found while I’ve been working on understanding Android from the perspective of a web and JavaScript guy.

If you're just getting started with Android this post should serve as a decent launch pad.

## Tutorials & Learning Resources

**[TeamTreehouse.com](http://www.teamtreehouse.com)**

By far the best resource I’ve found anywhere. The tutorials are well presented, clearly organised and the content is covered in a comprehensive follow along way. I’ve done all the Android app sessions, code challenges and other activities in the lessons and I’ve found it all to be useful and rewarding. Plus their website is excellent.

Some of the courses currently on offer include:

- Build a blog reader app with Android
- Using Parse.com as a backend for an Android app
- Build a self-destructing messaging app
- Android tools overview

The only mild criticism I can level at TeamTreehouse is the somewhat patronising frog character who would occasionally pop up and make some inane comment. I realise my dislike of this guy might be more a cultural difference than anything else (I’m too sensible and British, maybe?) but I found him a little grating and unnecessary. (Sorry frog).

**The [Code Path Guides](https://github.com/thecodepath/android_guides/wiki#getting-started)**

I only recently discovered [this repository on Github](https://github.com/thecodepath/android_guides/wiki#getting-started) where a bunch of awesome people led by the two CodePath founders are building a set of current, up to date Android documentation and examples. I love this idea because it means we can all contribute to improve and correct the documentation as it becomes outdated.

It’s the nature of software development that code and APIs often require subtle changes over time, ending up [causing hours of frustration](http://joearms.github.io/2014/02/07/why-programming-is-difficult.html) as tutorials and code examples that once worked flawlessly no longer seem to be any use.

I’d love to see more docs and tutorials handled in this way. I just moved to Ghost to make publishing easier but this sort of thing makes me want to move back to managing my blog with static files on Github.

**[Google Developer Training](http://developer.android.com/training/index.html)**

The official Google Android training docs contain some pretty useful examples. They’re often more comprehensive than examples found in the documentation for individual items, providing complete working examples rather than example snippets without a wider context.

**[Google I/O 2013 Android YouTube Playlist](https://www.youtube.com/playlist?list=PLOU2XLYxmsIJOOTFfYzhR2d-rcSbBbEE_)**

A large collection of Android related presentations from Google I/O 2013. From a fireside chat with the Android team to talks on [Design for UI Developers](https://www.youtube.com/watch?v=Jl3-lzlzOJI&list=PLOU2XLYxmsIJOOTFfYzhR2d-rcSbBbEE_&index=26) and [Structure in App Design](https://www.youtube.com/watch?v=XpqyiBR0lJ4&list=PLOU2XLYxmsIJOOTFfYzhR2d-rcSbBbEE_&index=23).

**[Github Repositories](https://github.com/search?q=android)**

Github is an amazing resource for learning. Search all repositories for the term “[Android](https://github.com/search?q=android)” and thousands of projects will be returned. Here are a few notable open source apps that I’ve come across that are great for reading production code to see how projects are organised and how functionality is implemented.

- **[Gaug.es for Android](https://github.com/fastestforward/gauges-android)**
  Gaug.es is a web traffic analytics product. “Collect and analyze your web traffic for all your sites in real-time using our fast, reliable, hosted system. See overview data for all your sites on a single page.” The app is rather beautiful.

- **[Github App for Android](https://github.com/github/android)**

- **[OwnCloud App for Android](https://github.com/owncloud/android)**

I don’t pretend to know much about these apps but it’s great for checking out examples of how features are implemented.

**[Vogella Tutorials](http://www.vogella.com/tutorials/android.html)**

An extensive collection of tutorials covering everything from intents to gestures.

## Forums, Groups, Channels

When working with a framework or technology it’s always useful to subscribe to websites, newsletters and groups that cover the subject. With this in mind there a few places I generally look for people discussing related topics: IRC, Google Groups & Reddit.

The **[/r/androiddev](http://reddit.com/r/androiddev)** subreddit is worth keeping an eye on. On Freenode the **#android-dev** and **#reddit-android** channels are a good place to hang out and learn casually.

While these channels don’t directly address topics that immediately relate what you’re working on right now, you’ll often find that you’ll pick up answers to problems that you haven’t hit yet, but that you almost certainly will in future. Keeping an eye on these things is a favour to your future self.

## Other Useful Resources

- **[Android Holo Colours](http://android-holo-colors.com/)**
  Generate Android components like EditText or spinners and tax with your own colour schemes.

- **[Android Patterns](http://www.androidpatterns.com)**
  Tons of examples on how to design features. Although there are no implementation examples here, it’s a great place to research the options available and current trends and best practices for displaying different kinds of data and functionality.

- **[Android Niceties](http://androidniceties.tumblr.com/)**
  Showcases some of the nicest Android apps available.

## Useful Libraries

Some things, like Async network tasks, are trickier than perhaps you want to deal with on a regular basis. Thanks to people like the excellent folks over at [Square](http://square.github.io/#android), Google and other places there are libraries available that simplify some of the messiness associated with loading remote resources, parsing JSON, saving to a local database.

#### Remote requests

[Retrofit](http://square.github.io/retrofit/)
A type-safe REST client for Android and Java

[Picasso](http://square.github.io/picasso/)
A powerful image downloading and caching library for Android

Retrofit uses [okhttp](http://square.github.io/okhttp/) and [Google Gson](https://code.google.com/p/google-gson/) behind the scenes for network request and JSON parsing respectively.

These libraries make loading remote images and data a much easier proposition than without. It’s probably worth doing it manually a few times though, just to understand the basics of AsyncTask workflow.

#### Database ORMs (Object Relational Mapping)

[ORMLite](http://ormlite.com/)
ORMLite is a lightweight library managing your SQLite database. It’s a Java library that supports Android. I found it quite simple to get started but very tricky tying this together with Retrofit handling my JSON parsing. I need to look in to this more.

[Active Android](http://activeandroid.com)
I switched out ORMLite for ActiveAndroid and started playing with that yesterday. So far it’s been simpler to get setup than ORMLite, but it’s worth noting that my problems with ORMlite stem from my inexperience rather than any particular flaw with the library itself. I’m working on this too.

#### Other stuff

[SimpleAdapter](https://github.com/ribot/easy-adapter)
This looks like a fantastic way to use annotations to avoid having to write lots of boilerplate view adapter code for simple views.

[CardsLib](https://github.com/gabrielemariotti/cardslib) Impressively full featured library for implementing card-like views ala Google Now, Plus, etc.

[Segmented Control for Android](https://github.com/hoang8f/android-segmented-control) I understand that segmented controls are a frequently used element in iOS, and here's an implementation for Android.

[Android DB Inspector](https://github.com/infinum/android_dbinspector)
You can drop this class into your app and get in-app view in to your SQL Lite database. Very useful.

## In Conclusion

So that’s a quick overview of the resources and tools that I’ve found useful over the last few weeks while I’ve been getting to grips with basic Android development.

Over time I’ll expand on this post and update the content as and when I come across more useful stuff.

_You should follow me on twitter [@shaunchurch](http://twitter.com/shaunchurch)._
