---
title: Building and installing Go code
description: Setting up a workspace the right way
date: 2012-11-26T19:46:13+00:00
tags:
  - golang
  - web
---

So you just [installed](http://golang.org/doc/install) Go in your system, now you’ll have to create a workspace to work with packages provided by third-parties or making your own ones. A workspace is simply a directory which contains your code, binaries and package objects compiled from it.

### Creating the workspace

The workspace can be created anywhere on your system, let’s create it on a directory called `golang`.

```bash
$ mkdir ~/golang
$ export GOPATH=$HOME/golang
```

We have to set up the `GOPATH` environment variable to tell golang tools this is where we want our workspace to be.

### Writing our first program

Go code resides in the `src` directory of your workspace. Inside of it we will create our first namespace. Its name should be unique to avoid conflicts with other packages. Let’s create all this and make our first and _awesome_ “Hello World” program.

```bash
$ cd ~/golang
$ mkdir -p src/phollow.fr
```

We want our program to be called `hello`, so let’s create a `hello` directory inside our namespace, and then the Go code itself.

```bash
$ cd src/phollow.fr
$ mkdir hello
$ cd hello
$ vim hello.go
```

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
```

**FYI:** there is no real _main_ package, it’s just a convention telling Go you want this code to generate an executable binary.

Now you just have to type `go install` to let the Go tools compile and install our binary. Every binary is installed inside the `bin` directory of your workspace.

```bash
$ ls ~/golang/bin
hello
$ ~/golang/bin/hello
Hello, world!
```

Yeah, it’s working. It may be a good idea to put this bin directory on our system PATH: `export PATH=$HOME/golang/bin:$PATH`. This way we just have to type `hello` to run our program.

### Creating a package

Now let’s create a **package**. They can be imported in other Go programs and use a different package name, ie. not “main”. We want to make a little function that will double our strings. So we will create a string directory in our namespace and write the code.

```bash
$ cd ~/golang/src/phollow.fr
$ mkdir string
$ cd string
$ vim string.go
```

```go
package string

// Pretty useless I know, it’s just for the sake
// of this example ;)
func Double(s string) string {
    return s+s
}

```

**FYI:** you can see that my function begins with an **uppercase**. This is a convention, telling that this function can be used outside the package itself (you know, like public/private stuff…).

You can check if this function is working by typing `go build`. No output = no problem. Let’s make this package available to other programs:

```bash
$ go install
$ ls ~/golang/pkg/darwin_amd64/phollow.fr
string.a
```

Great! There it is. As you can see you will find them all in the `pkg` directory.

### Using our new package

Let’s go back editing our **hello.go** program:

```go
package main

import (
    "fmt"
    "phollow.fr/string"
)

func main() {
    fmt.Println(string.Double("Hello, world!"))
}
```

```bash
$ go install
$ hello
Hello, world!Hello, world!
```

So basically the Go tools found our package `phollow.fr/string` and use the _string.a_ and linked it to our hello code. Not really hard.

### Bonus: Testing Go code

You can never be sure your code is 100% working without testing it. And good news, there is a build-in tool to do so in Go. What we want to test here is our `string.Double()` function. A test file resides besides the code and should be named `packagename_test.go`. So we will go with `string_test.go` inside the **string** directory in our namespace.

```go
package string

import "testing"

func Test(t *testing.T) {
    var tests = []struct {
        s, want string
    }{
        {"Hello", "HelloHello"},
        {"Good Bye!", "Good Bye!Good Bye!"},
        {"日本", "日本日本"},
        {"", ""},
    }

    for _, c := range tests {
        got := Double(c.s)
        if got != c.want {
            t.Errorf("Double(%s) == %s, want %s", c.s, got, c.want)
        }
    }
}
```

```bash
$ go test
PASS
ok  	phollow.fr/string	0.010s
```

And now you are ready to build cool stuff with Go!