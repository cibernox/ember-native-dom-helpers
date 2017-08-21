# 0.5.4
- [BUGFIX] Support passing `document` and `window` to helpers
- [BUGFIX] Early exit `waitUntil` polling if the condition is true immediately.

# 0.5.3
- [BUGFIX] Fix problem `selectFiles` on browsers that consider `FileList`s readonly (which they all should)

# 0.5.0
- [BREAKING] Change return value of `findAll` to be an `Array` (instead of a `NodeList`).

# 0.4.2
-  [BUGFIX] Allow `click` to receive a context element as second argument like the
   default `click` helper from Ember does. If a context element is provided, the options object can be passed as third argument.
# 0.4.0
- [BREAKING] Remove deprecated import paths.
- [ENHANCEMENT] Rework of `focus`/`blur` and `keyEvent` to _mostly_ work when the browser is not
  focused.
