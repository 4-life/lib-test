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
    TextContentDTO,
} from './TextContentDTO.js';

/**
 * Response with information about the dictionary
 * @export
 * @interface FoundDictionaryDTO
 */
export interface FoundDictionaryDTO {
    /**
     * Unique comprehensible dictionary type
     * @type {string}
     * @memberof FoundDictionaryDTO
     */
    dictionary_type: string;
    /**
     * 
     * @type {TextContentDTO}
     * @memberof FoundDictionaryDTO
     */
    dictionary_name: TextContentDTO;
}
