---
date: "2015-04-20T09:01:00+01:00"
title: "Unit Testing Java Classes in Android Studio"
path: "/words/unit-testing-java-classes-in-android-studio"
tags: dev
excerpt: Testing Android applications has a reputation for being more difficult than it should be. Testing plain Java code on the other hand should be relatively easy.
---

Testing Android applications has a reputation for being <a href="http://philosophicalhacker.com/2015/04/17/why-android-unit-testing-is-so-hard-pt-1/">more difficult than it should be</a>.

Testing plain Java code on the other hand should be relatively easy. One of the benefits of pulling code out of Activities and Fragments and into plain Java classes is that those methods then become much easier to test. In theory.

<figure>
	<img src="/images/2015/04/UnitTests.png" alt="Working Unit Tests!" />
	<figcaption>Working unit tests!</figcaption>
</figure>

#### Fragmented Guides, Beta Software

I’d heard good things about [Android Studio adding support for Unit Testing](https://www.bignerdranch.com/blog/triumph-android-studio-1-2-sneaks-in-full-testing-support/) and had followed every set up post I could find. All of them seemed to fall short in some simple way. The [official setup guide](http://tools.android.com/tech-docs/unit-testing-support) explains how to set up the IDE (although much of this is no longer required following the latest update!) but then stops before showing an example test class. This sent me on a goose chase extending TestCase classes from old versions of JUnit and other errors because I didn’t know what I was doing. For the record, [this is how it needs to look](https://github.com/shaunchurch/AndroidTestingTest/blob/master/app/src/test/java/com/shaunchurch/mytestedapplication/TestClassTest.java).

All of this is exacerbated by the fact that when running tests from Android Studio they will seemingly only run successfully once. Subsequent runs will result in _“No test events received”_ or _“Empty test suite”_ messages. This might well be because Android Studio 1.2 is still a beta release.

You have to change some code and recompile for them to work again. This simple point has been a cause of multiple false dead ends while trying to set this up.** Often it’s working fine, but the second run fails regardless**.

#### A working simple project

I’ve [posted a simple working project to Github](https://github.com/shaunchurch/AndroidTestingTest) that is as simple as it’s possible to be for a working unit test set up. I created a new project with a single MainActivity.

I added a "TestClass.java" to the project with one public int and two public functions, one that doubles the public int and another that runs a simple regex on a String.

Next, I created the [/src/test/java/com/mypackage/app/TestClassTest.java](https://github.com/shaunchurch/AndroidTestingTest/blob/master/app/src/test/java/com/shaunchurch/mytestedapplication/TestClassTest.java) package and file.

This is where you need to select "Build Variants" on the left of Android Studio and make sure "Unit Tests" is selected ([as detailed in this official setup post](http://tools.android.com/tech-docs/unit-testing-support)).

_It's important to note that /src/test is the directory for Unit Tests. /src/androidTest is for Instrumentation tests, I'm assuming using Espresso 2 which is shortly due to be officially supported. Also worth mentioning that in your build.gradle testCompile should be used for dependencies required for unit tests, and androidTestCompile is needed for dependencies used for instrumentation tests. This is an important difference._

The only other requirement is to include a recent version of JUnit in your build.gradle file to prevent error messages like "Test filtering not supported for given version of JUnit."

    testCompile 'junit:junit:4.12'

Then you should be able to right click on TestClassTest.java and Run the tests. If you run them as Debug the Debugger works and you can get on with a spot of test driven development.

At last, it makes sense!

#### Bonus Speed Boost

It turns out in the Edit Configurations entry for the test that appears the first time you right click and run it, you can remove the "Make" task and just use the "Gradle-aware make". This seems to speed up running tests significantly.
