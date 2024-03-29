"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataArgsStorage_1 = require("../metadata-args/MetadataArgsStorage");
/**
 * Transforms entity schema into metadata args storage.
 * The result will be just like entities read from decorators.
 */
var EntitySchemaTransformer = /** @class */ (function () {
    function EntitySchemaTransformer() {
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Transforms entity schema into new metadata args storage object.
     */
    EntitySchemaTransformer.prototype.transform = function (schemas) {
        var metadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
        schemas.forEach(function (entitySchema) {
            var options = entitySchema.options;
            // add table metadata args from the schema
            var tableMetadata = {
                target: options.target || options.name,
                name: options.tableName,
                database: options.database,
                schema: options.schema,
                type: options.type || "regular",
                orderBy: options.orderBy,
                synchronize: options.synchronize
            };
            metadataArgsStorage.tables.push(tableMetadata);
            // add columns metadata args from the schema
            Object.keys(options.columns).forEach(function (columnName) {
                var column = options.columns[columnName];
                var mode = "regular";
                if (column.createDate)
                    mode = "createDate";
                if (column.updateDate)
                    mode = "updateDate";
                if (column.version)
                    mode = "version";
                if (column.treeChildrenCount)
                    mode = "treeChildrenCount";
                if (column.treeLevel)
                    mode = "treeLevel";
                if (column.objectId)
                    mode = "objectId";
                var columnAgrs = {
                    target: options.target || options.name,
                    mode: mode,
                    propertyName: columnName,
                    options: {
                        type: column.type,
                        name: column.objectId ? "_id" : column.name,
                        length: column.length,
                        width: column.width,
                        nullable: column.nullable,
                        readonly: column.readonly,
                        select: column.select,
                        primary: column.primary,
                        unique: column.unique,
                        comment: column.comment,
                        default: column.default,
                        onUpdate: column.onUpdate,
                        precision: column.precision,
                        scale: column.scale,
                        zerofill: column.zerofill,
                        unsigned: column.unsigned,
                        charset: column.charset,
                        collation: column.collation,
                        enum: column.enum,
                        asExpression: column.asExpression,
                        generatedType: column.generatedType,
                        hstoreType: column.hstoreType,
                        array: column.array,
                        transformer: column.transformer
                    }
                };
                metadataArgsStorage.columns.push(columnAgrs);
                if (column.generated) {
                    var generationArgs = {
                        target: options.target || options.name,
                        propertyName: columnName,
                        strategy: typeof column.generated === "string" ? column.generated : "increment"
                    };
                    metadataArgsStorage.generations.push(generationArgs);
                }
            });
            // add relation metadata args from the schema
            if (options.relations) {
                Object.keys(options.relations).forEach(function (relationName) {
                    var relationSchema = options.relations[relationName];
                    var relation = {
                        target: options.target || options.name,
                        propertyName: relationName,
                        relationType: relationSchema.type,
                        isLazy: relationSchema.lazy || false,
                        type: relationSchema.target,
                        inverseSideProperty: relationSchema.inverseSide,
                        isTreeParent: relationSchema.treeParent,
                        isTreeChildren: relationSchema.treeChildren,
                        options: {
                            eager: relationSchema.eager || false,
                            cascade: relationSchema.cascade,
                            nullable: relationSchema.nullable,
                            onDelete: relationSchema.onDelete,
                            onUpdate: relationSchema.onUpdate,
                            primary: relationSchema.primary,
                            persistence: relationSchema.persistence
                        }
                    };
                    metadataArgsStorage.relations.push(relation);
                    // add join column
                    if (relationSchema.joinColumn) {
                        if (typeof relationSchema.joinColumn === "boolean") {
                            var joinColumn = {
                                target: options.target || options.name,
                                propertyName: relationName
                            };
                            metadataArgsStorage.joinColumns.push(joinColumn);
                        }
                        else {
                            var joinColumn = {
                                target: options.target || options.name,
                                propertyName: relationName,
                                name: relationSchema.joinColumn.name,
                                referencedColumnName: relationSchema.joinColumn.referencedColumnName
                            };
                            metadataArgsStorage.joinColumns.push(joinColumn);
                        }
                    }
                    // add join table
                    if (relationSchema.joinTable) {
                        if (typeof relationSchema.joinTable === "boolean") {
                            var joinTable = {
                                target: options.target || options.name,
                                propertyName: relationName
                            };
                            metadataArgsStorage.joinTables.push(joinTable);
                        }
                        else {
                            var joinTable = {
                                target: options.target || options.name,
                                propertyName: relationName,
                                name: relationSchema.joinTable.name,
                                database: relationSchema.joinTable.database,
                                schema: relationSchema.joinTable.schema,
                                joinColumns: (relationSchema.joinTable.joinColumn ? [relationSchema.joinTable.joinColumn] : relationSchema.joinTable.joinColumns),
                                inverseJoinColumns: (relationSchema.joinTable.inverseJoinColumn ? [relationSchema.joinTable.inverseJoinColumn] : relationSchema.joinTable.inverseJoinColumns),
                            };
                            metadataArgsStorage.joinTables.push(joinTable);
                        }
                    }
                });
            }
            // add index metadata args from the schema
            if (options.indices) {
                options.indices.forEach(function (index) {
                    var indexAgrs = {
                        target: options.target || options.name,
                        name: index.name,
                        unique: index.unique === true ? true : false,
                        spatial: index.spatial === true ? true : false,
                        fulltext: index.fulltext === true ? true : false,
                        synchronize: index.synchronize === false ? false : true,
                        where: index.where,
                        sparse: index.sparse,
                        columns: index.columns
                    };
                    metadataArgsStorage.indices.push(indexAgrs);
                });
            }
            // add unique metadata args from the schema
            if (options.uniques) {
                options.uniques.forEach(function (unique) {
                    var uniqueAgrs = {
                        target: options.target || options.name,
                        name: unique.name,
                        columns: unique.columns
                    };
                    metadataArgsStorage.uniques.push(uniqueAgrs);
                });
            }
            // add check metadata args from the schema
            if (options.checks) {
                options.checks.forEach(function (check) {
                    var checkAgrs = {
                        target: options.target || options.name,
                        name: check.name,
                        expression: check.expression
                    };
                    metadataArgsStorage.checks.push(checkAgrs);
                });
            }
            // add exclusion metadata args from the schema
            if (options.exclusions) {
                options.exclusions.forEach(function (exclusion) {
                    var exclusionArgs = {
                        target: options.target || options.name,
                        name: exclusion.name,
                        expression: exclusion.expression
                    };
                    metadataArgsStorage.exclusions.push(exclusionArgs);
                });
            }
        });
        return metadataArgsStorage;
    };
    return EntitySchemaTransformer;
}());
exports.EntitySchemaTransformer = EntitySchemaTransformer;
//# sourceMappingURL=EntitySchemaTransformer.js.map