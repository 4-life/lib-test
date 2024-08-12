/* tslint:disable */
/* eslint-disable */
/**
 * Kupsilla Data Platform dictionary engine as a service
 * Swagger for \'Kupsilla Data Platform dictionary engine as a service\'
 *
 * The version of the OpenAPI document: 0.1.0-df9ccc8-df9ccc8-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    TranslatedTextContentDTO,
} from './TranslatedTextContentDTO';

/**
 * An object representing a text content
 * @export
 * @interface TextContentDTO
 */
export interface TextContentDTO {
    /**
     * Content text that is the same in all languages
     * @type {string}
     * @memberof TextContentDTO
     */
    non_translatable_text?: string;
    /**
     * 
     * @type {TranslatedTextContentDTO}
     * @memberof TextContentDTO
     */
    translation?: TranslatedTextContentDTO;
}
