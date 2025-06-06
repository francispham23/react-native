/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

export type FeatureFlagValue = boolean | number | string;

export type FeatureFlagDefinitions = $ReadOnly<{
  common: CommonFeatureFlagList,
  jsOnly: JsOnlyFeatureFlagList,
}>;

/**
 * OSSReleaseStageValue is used to determine the value of a feature flag in different release stages:
 * - none: the value of the feature flag will be `defaultValue` on all releases.
 * - experimental: the value of the feature flag will be `expectedReleaseValue` on experimental releases and `defaultValue` on canary and stable releases.
 * - canary: the value of the feature flag will be `expectedReleaseValue` on experimental and canary releases and `defaultValue` on stable releases.
 * - stable: the value of the feature flag will be `expectedReleaseValue` on all releases.
 */
export type OSSReleaseStageValue =
  | 'none'
  | 'experimental'
  | 'canary'
  | 'stable';

export type CommonFeatureFlagConfig<
  TValue: FeatureFlagValue = FeatureFlagValue,
> = $ReadOnly<{
  defaultValue: TValue,
  metadata: FeatureFlagMetadata<TValue>,
  ossReleaseStage: OSSReleaseStageValue,
  // Indicates if this API should only be defined in JavaScript, only to
  // preserve backwards compatibility with existing native code temporarily.
  skipNativeAPI?: true,
}>;

export type CommonFeatureFlagList = $ReadOnly<{
  [flagName: string]: CommonFeatureFlagConfig<>,
}>;

export type JsOnlyFeatureFlagConfig<
  TValue: FeatureFlagValue = FeatureFlagValue,
> = $ReadOnly<{
  defaultValue: TValue,
  metadata: FeatureFlagMetadata<TValue>,
  ossReleaseStage: OSSReleaseStageValue,
}>;

export type JsOnlyFeatureFlagList = $ReadOnly<{
  [flagName: string]: JsOnlyFeatureFlagConfig<>,
}>;

export type FeatureFlagMetadata<TValue: FeatureFlagValue = FeatureFlagValue> =
  | $ReadOnly<{
      purpose: 'experimentation',
      /**
       * Approximate date when the flag was added.
       * Used to help prioritize feature flags that need to be cleaned up.
       */
      dateAdded: string,
      description: string,
      expectedReleaseValue: TValue,
    }>
  | $ReadOnly<{
      purpose: 'operational' | 'release',
      description: string,
      expectedReleaseValue: TValue,
    }>;

export type GeneratorConfig = $ReadOnly<{
  featureFlagDefinitions: FeatureFlagDefinitions,
  jsPath: string,
  commonCxxPath: string,
  commonNativeModuleCxxPath: string,
  androidPath: string,
  androidJniPath: string,
}>;

export type GeneratorOptions = $ReadOnly<{
  verifyUnchanged: boolean,
}>;

export type GeneratorResult = $ReadOnly<{
  [path: string]: string /* content */,
}>;
