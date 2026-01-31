#!/usr/bin/env perl

# LPL 2026-01-30 document

# go through all the projects and move the code back to the repository

use strict;
use warnings;

sub run {
    my ($cmd) = @_;
    print "Running: $cmd\n";
    system($cmd) == 0
        or die "Command failed: $cmd\n";
}

# Ensure we are inside a git repository
system("git rev-parse --is-inside-work-tree > /dev/null 2>&1") == 0
    or die "Not inside a git repository\n";

# Ask for commit message
print "Enter commit message: ";
chomp(my $message = <STDIN>);

die "Commit message cannot be empty\n" unless length $message;

# Stage all changes
run("git add .");

# Commit
run(qq{git commit -m "$message"});

# Push to default remote and branch
run("git push");

print "Commit and push completed successfully\n";

# done
print "done.\n";
