#!/usr/bin/env perl

# LPL 2026-01-30 document
# LPL 2026-02-03 document make more automatic
# LPL 2026-02-05 document

# go through all the projects and move the code from to the repository

use strict;
use warnings;

# subroutine
sub run {
    my ($cmd) = @_;
    print "Running: $cmd\n";
    system($cmd) == 0
        or die "Command failed: $cmd\n";
}

# Ensure we are inside a git repository
system("git rev-parse --is-inside-work-tree > /dev/null 2>&1") == 0
    or die "pull_git.pl: error not inside a git repository\n";

# Ask for commit message
#print "Enter commit message: ";
#chomp(my $message = <STDIN>);
# hard-code commit message
my $message = "pull_git bot auto-commit.";

die "Commit message cannot be empty\n" unless length $message;

# Push to default remote and branch
run("git pull");

print "pull completed successfully\n";

# done
print "done.\n";
