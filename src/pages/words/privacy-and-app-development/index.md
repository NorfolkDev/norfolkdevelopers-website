---
date: "2019-08-31T09:21:00+01:00"
title: "Offline Apps Part I: Apps are not private"
tags: "apps, privacy"
---

**It's hard to build cloud-synced collaborative apps if you genuinely care about user privacy. Most apps are not private by default _by design_. They should be.**

## Making apps for making music

Sometimes I write songs. It's something I've done since I was a teenager. It's a theraputic process. The main benefit comes from the process itself. Most of the time no one hears these songs but me (and maybe the guy who lives upstairs).

In 2014 I released an [Android app created to help capture ideas for songs](https://play.google.com/store/apps/details?id=com.shaunchurch.songwriter.app). It's for jotting down ideas for lyrics and recording snippets of audio to go with it: playing guitar, humming a melody, recording an improvisation to review later.

It works great. I put it up for sale for a modest price and over recent years people have been discovering it organically and buying it. A growing number of them now use it consistently to record ideas. I use it myself often.

It's basically a notes app. Nothing fancy. Nothing original. But because it's focused on the songwriting niche there is an opportunity to cater specifically to those needs. I have a list of ideas for the future.

## Private work

Songwriting is often a [personal artistic exploration of ideas](https://www.brainpickings.org/2014/09/22/joni-mitchell-in-her-own-words-malka-marom). There's a need to open up to possibilities and be non-judgemental. To be free from the perceived judgement of others. To be free to express without consequence and rely on editing later to remove the bad or the embarrassing.

The creative process can be volatile, and [sometimes work needs polishing](https://www.brainpickings.org/2014/07/15/leonard-cohen-paul-zollo-creativity/) before it makes sense in the world.

For me, the data this app stores is sensitive. I need to be confident there is protection from prying eyes to fully engage.

## Big brother is watching

The idea of someone watching while you create ideas for songs is not conducive to a non-judgemental, free approach to creativity. **There's a cost to being seen and it shows up as self-censorship**.

I don't want the embarrassing teenage poetry of the first draft of the second verse I'm working on to make it out of my edit window. If there's a possibility of it getting out onto the public internet I'm going to think twice about writing it. That could be a loss. I might have reworked it in to something less cringe inducing, while carrying that same sentiment; it could become something that resonated with other inner juveniles. In part, that's the essence of songwriting.

**If we're censoring our true feelings we can't write our best work**. It's important to have privacy built-in to the apps you use to capture your creative ideas.

Data privacy is even more of a concern for other types of data. Consider private journaling or diaries.

_"But who is watching?"_

## Platforms as a service

Most application platforms store all user information in plain text. If I build an app today using Google's Firebase, I have access to every byte of data uploaded by that app's users.

If I build an app which offers users "a private diary, synced to your web browser through the cloud", it's now possible for me as the app administrator to read every sentence they write in the app in most cases. It may not be legal--depending on what terms and policies I ask users to agree to--but it will be possible. I'm not sure what sort of audit trail exists, if one exists at all.

The implications are obvious, but to be clear: **as the admin of a diary application built on Firebase the developer has access to the private diary entries of the users.**

That also goes for direct messages on that obscure dating site you joined that time.

## Offline for now

Songwriter's Notebook is not built on Firebase. It stores all recorded data in the app's secure directory on-device. It stores the lyric content and all the file metadata in a simple SQLite database in that same directory. This means we can rely entirely on Android's built-in security. It's difficult to gain access to the data in that directory without rooting the device.

The Export function allows you to optionally export files to another location for back up. This is opt-in and means you can make decisions about who you share your data with.

## The problem with offline for now

Keeping the data on-device means the app has no multi-device sync capability. It has no multi-user collaboration. It has no ability to re-import a previously exported backup. These are hugely important features, that are unavailable in part due to my desire to retain privacy. I want to allow users to opt-in to sharing, multi-device and multi-user collaboration features only if they need them. And then, I still want the data to remain unreadable to anyone not explicitly granted access.

The existing export feature encourages users to backup their data to less private services: Gmail or Dropbox for example. In some ways data shared with online services unencrypted becomes part of the public record. It could leak at any time, due to a technical oversight or a malicious hack. It happens all the time.

This caution comes at a cost. The app is less capable than a lot of modern apps because I think user privacy is more important than those features. But I still want those features. Multi-device cloud-based data sync is a baseline expectation for apps today.

**I would like to find a way to have both syncing and privacy. To have a cake that I can share with my friends if I feel like it, without having to offer everyone a piece.**

## The Challenge

**It's very hard to build a secure, offline-first, privacy conscious application that allows you to _opt-in_ to cloud-based multi-device sync and collaboration features.** Especially as a solo developer.

Some points for thought:

- **There is a crisis in software development when it comes to user privacy.**
- Everything you post unencrypted to an online service should be considered as part of the public record.
- There is no guarantee of privacy in most circumstances, but many services fail to make any attempt at it.
- Developers are building all sorts of software using development practices that don't consider user privacy in any way.
- There's a lot of work to be done to make private services more accessible. To make apps built this way more useful, convenient and streamlined.
- How many services have you used that rely on Google's Firebase Firestore or Realtime database? Probably many.
- This service shares your data with the app owner with no protections.
- Privacy is a growing concern.
- Offline-first is a growing movement
- Surveillance capitalism: there is every incentive to spy on user data, collect it, sell it and process it for derived information. Better if it's not available unless we opt-in.
- The problem is keeping your data private while still allowing effective multi-device access and multi-user collaboration.

The goal is to build offline-first applications that can work offline-only on any platform, but that can optionally move some data online, encrypted between devices and users, to allow multi-device access and multi-user collaboration.

I plan to write more on this in future and I'm interested to hear what you think.

I'm [@shaunchurch](https://twitter.com/shaunchurch) on twitter.

<!-- ## On CRDTs

CRDTs - resolvable in any order to the same end result, given a bias, and recorded history of all changes - it should be possible to build apps that default to local on-device storage, encrypt any data on-device before sharing, and each device would be capable of reconciling the updates to the same end result after decrypting the data. There could be a dumb sync server that handles up-time requirements, but otherwise it could operate peer-to-peer. -->

<!-- ## I'm going to get involved in this movement.

Songwriter's Notebook is right at the apex of the privacy / app development / offline-first debate. I've been struggling with this for about 4 years. Trying to find ways to build this app that keeps user privacy as a first class citizen, while enabling all the modern features we expect from using apps like google docs for years.

The problem is keeping your data private while still allowing effective collaboration.

There's a lot of work to be done in this area. There might even be libraries to build. There may be a startup in it

There's something here for sure. Offline first is a growing movement. Privacy consciousness is a growing movement. Songwriter's Notebook is a great example of why this matters, beyond just protecting your shopping lists.

this is about empowering everyone with technmology that allows them access to the benefits of the modern technological marvel without giving up their fundamental right to privacy, freedom of ideas, artistic expression, while it hurts no one else.

There's a lot to digest here. -->
