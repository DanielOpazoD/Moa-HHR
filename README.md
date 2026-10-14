# Moa public animation catalog

Data-only publication for HHR. 222 PNG atlases and catalog schema v1.
No executable code, workflows, clinical information or credentials.
Assets have immutable SHA-256 filenames; retain old PNGs when publishing new catalogs.
Publication is an atomic fast-forward commit; rollback by restoring an earlier catalog in a new commit.
The HHR repository contains scripts/moa/publish-catalog.mjs and its operating guide.
