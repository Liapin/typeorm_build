"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
var Repository = /** @class */ (function () {
    function Repository() {
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Creates a new query builder that can be used to build a sql query.
     */
    Repository.prototype.createQueryBuilder = function (alias, queryRunner) {
        return this.manager.createQueryBuilder(this.metadata.target, alias || this.metadata.targetName, queryRunner || this.queryRunner);
    };
    Object.defineProperty(Repository.prototype, "target", {
        /**
         * Returns object that is managed by this repository.
         * If this repository manages entity from schema,
         * then it returns a name of that schema instead.
         */
        get: function () {
            return this.metadata.target;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if entity has an id.
     * If entity composite compose ids, it will check them all.
     */
    Repository.prototype.hasId = function (entity) {
        return this.manager.hasId(this.metadata.target, entity);
    };
    /**
     * Gets entity mixed id.
     */
    Repository.prototype.getId = function (entity) {
        return this.manager.getId(this.metadata.target, entity);
    };
    /**
     * Creates a new entity instance or instances.
     * Can copy properties from the given object into new entities.
     */
    Repository.prototype.create = function (plainEntityLikeOrPlainEntityLikes) {
        return this.manager.create(this.metadata.target, plainEntityLikeOrPlainEntityLikes);
    };
    /**
     * Merges multiple entities (or entity-like objects) into a given entity.
     */
    Repository.prototype.merge = function (mergeIntoEntity) {
        var entityLikes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            entityLikes[_i - 1] = arguments[_i];
        }
        var _a;
        return (_a = this.manager).merge.apply(_a, tslib_1.__spread([this.metadata.target, mergeIntoEntity], entityLikes));
    };
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     *
     * Note that given entity-like object must have an entity id / primary key to find entity by.
     * Returns undefined if entity with given id was not found.
     */
    Repository.prototype.preload = function (entityLike) {
        return this.manager.preload(this.metadata.target, entityLike);
    };
    /**
     * Saves one or many given entities.
     */
    Repository.prototype.save = function (entityOrEntities, options) {
        return this.manager.save(this.metadata.target, entityOrEntities, options);
    };
    /**
     * Removes one or many given entities.
     */
    Repository.prototype.remove = function (entityOrEntities, options) {
        return this.manager.remove(this.metadata.target, entityOrEntities, options);
    };
    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     */
    Repository.prototype.insert = function (entity, options) {
        return this.manager.insert(this.metadata.target, entity, options);
    };
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
    Repository.prototype.update = function (criteria, partialEntity, options) {
        return this.manager.update(this.metadata.target, criteria, partialEntity, options);
    };
    /**
     * Deletes entities by a given criteria.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
    Repository.prototype.delete = function (criteria, options) {
        return this.manager.delete(this.metadata.target, criteria, options);
    };
    /**
     * Counts entities that match given find options or conditions.
     */
    Repository.prototype.count = function (optionsOrConditions) {
        return this.manager.count(this.metadata.target, optionsOrConditions);
    };
    /**
     * Finds entities that match given find options or conditions.
     */
    Repository.prototype.find = function (optionsOrConditions) {
        return this.manager.find(this.metadata.target, optionsOrConditions);
    };
    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    Repository.prototype.findAndCount = function (optionsOrConditions) {
        return this.manager.findAndCount(this.metadata.target, optionsOrConditions);
    };
    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     */
    Repository.prototype.findByIds = function (ids, optionsOrConditions) {
        return this.manager.findByIds(this.metadata.target, ids, optionsOrConditions);
    };
    /**
     * Finds first entity that matches given conditions.
     */
    Repository.prototype.findOne = function (optionsOrConditions, maybeOptions) {
        return this.manager.findOne(this.metadata.target, optionsOrConditions, maybeOptions);
    };
    /**
     * Finds first entity that matches given conditions.
     */
    Repository.prototype.findOneOrFail = function (optionsOrConditions, maybeOptions) {
        return this.manager.findOneOrFail(this.metadata.target, optionsOrConditions, maybeOptions);
    };
    /**
     * Executes a raw SQL query and returns a raw database results.
     * Raw query execution is supported only by relational databases (MongoDB is not supported).
     */
    Repository.prototype.query = function (query, parameters) {
        return this.manager.query(query, parameters);
    };
    /**
     * Clears all the data from the given table/collection (truncates/drops it).
     *
     * Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.
     * @see https://stackoverflow.com/a/5972738/925151
     */
    Repository.prototype.clear = function () {
        return this.manager.clear(this.metadata.target);
    };
    /**
     * Increments some column by provided value of the entities matched given conditions.
     */
    Repository.prototype.increment = function (conditions, propertyPath, value) {
        return this.manager.increment(this.metadata.target, conditions, propertyPath, value);
    };
    /**
     * Decrements some column by provided value of the entities matched given conditions.
     */
    Repository.prototype.decrement = function (conditions, propertyPath, value) {
        return this.manager.decrement(this.metadata.target, conditions, propertyPath, value);
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map