---
date: "2014-06-21T19:20:00+01:00"
title: "Why is that Web Dev running Android Studio? 4 months on..."
path: "/words/why-is-that-web-dev-running-android-studio-4-months-on"
tags: dev
excerpt: Towards the end of February—just over 4 months ago—I installed Android Studio and set out trying to build my first Android app.
---

It’s been quite a ride.

Towards the end of February—just over 4 months ago—I installed Android Studio and set out trying to build my first Android app.

After a rocky start working with some poorly presented tutorials to build an alarm clock app I discovered teamtreehouse.com’s Android section, and spent an intensive three days working through every one of their Android tutorials, completing all the exercises and quizzes. One “shake for prediction” Crystal Ball app and one simple RSS reader later I was on a roll.

<figure>
	<img src="/static/images/why-is-that-webdev/firstbump-1.png" alt="FistBump" />
	<figcaption>FistBump</figcaption>
</figure>

After finishing the “Ribbit” app tutorial, which built a basic SnapChat clone using [Parse](http://parse.com), I continued working on the code and converted it into “FistBump”, which was based around the concept of sending a picture of something you had achieved to your friends as a “FistBump” gesture, to which they could respond with a FistBump reply. It was [a bit like Yo only needlessly complicated](https://play.google.com/store/apps/details?id=com.justyo). I played with the Parse backend and integrated Parse push notifications.

Then I set about implementing an app that could search and display data from the [TV DB](http://thetvdb.com). I started experimenting with open source libraries like [Retrofit](https://github.com/square/retrofit) and [Picasso](https://github.com/square/picasso) for this. It was both excellent fun and extremely frustrating at times (inconsistent XML?), but I pushed through it.

Then I started working on Android projects at work while continuing to learn and research in my spare time. Most recently I've even had the chance to work on a [Google Glass](http://google.com/glass) project.

## Revisiting an unachievable idea

Back in March while working on some ideas for some music, I realised I needed a really lightweight, simple note and audio recording app that I could use to write lyrics and record snippets of audio for melodies or chord progressions. I tried to implement it then, but after spending a week’s worth of evenings fruitlessly, I put the project on hold.

Last weekend, I decided it was time to revisit it. I was feeling more confident that I could build the basic functionality after spending the previous three and a half months focusing exclusively on all things Android related.

I started from the ground up, sketching out the basic idea. A few iterations later I moved in to [Sketch](http://bohemiancoding.com/sketch/) and built a rough wireframe mockup of the features to give myself a guide. Then I jumped in to Android Studio and fired up a fresh project.

By Sunday evening, my prototype was working.

I used the app for the week, and began talking to people about it. The reaction was quite positive; other people seemed to think it was a useful idea. Enthused, I put in some evening hours to clean up the UI and fix a couple of bugs I’d uncovered and then I posted a screenshot of the app to [/r/songwriters](http://reddit.com/r/songwriters) on reddit. The response was positive there as well, and a number of people joined my [Google+ beta community](https://plus.google.com/communities/104587189437093114899) in order to test it.

This weekend, I compiled and signed a first release, took some screenshots, placed them on a Sketch template of a Nexus 5, added a subtle background gradient and [uploaded the app to the Play store](https://play.google.com/store/apps/details?id=com.shaunchurch.songwriter.app).

#### Meet the first release of Songwriter’s Notebook

<figure>
	<img src="/static/images/why-is-that-webdev/5_never_forget_how_it_went.png" alt="Songwriter's Notebook" />
	<figcaption>Songwriter's Notebook</figcaption>
</figure>

It’s nothing much, but it does feel like a minor triumph to have an [app published on the Play store](https://play.google.com/store/apps/details?id=com.shaunchurch.songwriter.app) after all the hours I’ve put in to get here.

I have plenty more things planned for future updates.

## The question of cost

The goal of this app isn’t to make a million. The goal also isn’t to acquire lots of users who may or may not require support, or uncover rare bugs. It’s a learning experience, an experiment, and practice. Most of all it's an app I needed myself, and I'm pleased I was able to build it for me. Getting it in the Play store gives another boost of motivation to continue improving the app and my skills along with it.

I didn’t want to make the app free, and I wasn’t concerned about a cost resulting in fewer downloads. If someone sees enough value in the app to pay for it, then I will do my best to make sure it serves them well. If not, they can use something else and everyone is happy. I priced the app at £1.79 in the UK and \$2.49 in the US. I wonder if anyone will buy it?

Follow me on twitter: [@shaunchurch](https://twitter.com/shaunchurch)

[Check out the app on Google Play](https://play.google.com/store/apps/details?id=com.shaunchurch.songwriter.app)
