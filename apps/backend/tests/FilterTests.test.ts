import { expect, test } from "vitest";
import MapNode from "common/src/map/MapNode.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import FilterManager from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";

const nodes: MapNode[] = [];

const node1: MapNode = new MapNode({
  nodeID: "test1",
  xcoord: 123,
  ycoord: 8234,
  floor: "L2",
  building: "building1",
  nodeType: "HALL",
  longName: "test longName",
  shortName: "test shortName",
});

const node2: MapNode = new MapNode({
  nodeID: "test2",
  xcoord: 123,
  ycoord: 8234,
  floor: "L1",
  building: "building3",
  nodeType: "CONF",
  longName: "test longName",
  shortName: "test shortName",
});

const node3: MapNode = new MapNode({
  nodeID: "test3",
  xcoord: 123,
  ycoord: 8234,
  floor: "L1",
  building: "building2",
  nodeType: "CONF",
  longName: "test longName",
  shortName: "test shortName",
});

const node4: MapNode = new MapNode({
  nodeID: "test4",
  xcoord: 123,
  ycoord: 8234,
  floor: "L1",
  building: "building2",
  nodeType: "ELEV",
  longName: "test longName",
  shortName: "test shortName",
});

nodes.push(node1);
nodes.push(node2);
nodes.push(node3);
nodes.push(node4);

FilterManager.getInstance().registerFilter(
  FilterName.BUILDING,
  () => new BuildingFilter(),
);
FilterManager.getInstance().registerFilter(
  FilterName.FLOOR,
  () => new FloorFilter(),
);
FilterManager.getInstance().registerFilter(
  FilterName.TYPE,
  () => new TypeFilter(),
);

test("Test floorFilter", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, ["L1"])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node2, node3, node4]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, ["L2"])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node1]);
});

test("Test TypeFilter", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, ["CONF"])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node2, node3]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      "HALL",
      "ELEV",
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node1, node4]);
});

test("Test BuildingFilter", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      "building1",
      "building3",
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node1, node2]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      "building2",
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node3, node4]);

  const filters3: Filter[] = [];
  filters3.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters3, nodes),
  ).toStrictEqual([]);

  const filters4: Filter[] = [];
  filters4.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      "building1",
      "building2",
      "building3",
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters4, nodes),
  ).toStrictEqual([node1, node2, node3, node4]);
});

test("Test multiple filters", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, ["L1"])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, ["ELEV"])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node4]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, ["ELEV"])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, ["L1"])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node4]);

  const filters3: Filter[] = [];
  filters3.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, ["ELEV"])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, ["L1"])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      "building3",
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters3, nodes),
  ).toStrictEqual([]);
});
