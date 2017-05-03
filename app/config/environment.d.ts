export default config;

/**
 * Type declarations for
 *    import config from './config/environment'
 *
 * For now these need to be managed by the developer
 * since different ember addons can materialize new entries.
 */
declare namespace config {
  export var environment: any;
  export var modulePrefix: string;
  export var podModulePrefix: string;
  export var locationType: string;
}
