import { expect, test } from "vitest";
import MapNode from "common/src/map/MapNode.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
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
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L1"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node2, node3, node4]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L2"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node1]);
});

test("Test TypeFilter", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "CONF"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node2, node3]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "HALL"),
      generateFilterValue(false, "ELEV"),
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
      generateFilterValue(false, "building1"),
      generateFilterValue(false, "building3"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node1, node2]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      generateFilterValue(false, "building2"),
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
      generateFilterValue(false, "building1"),
      generateFilterValue(false, "building2"),
      generateFilterValue(false, "building3"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters4, nodes),
  ).toStrictEqual([node1, node2, node3, node4]);
});

test("Test multiple filters", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L1"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "ELEV"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node4]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "ELEV"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L1"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node4]);

  const filters3: Filter[] = [];
  filters3.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "ELEV"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L1"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.BUILDING, [
      generateFilterValue(false, "building3"),
    ])!,
  );
  expect(
    FilterManager.getInstance().applyFilters(filters3, nodes),
  ).toStrictEqual([]);
});

test("Type inversion", () => {
  const filters1: Filter[] = [];

  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(true, "HALL"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([node2, node3, node4]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(true, "CONF"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(true, "L1"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node1]);

  const filters3: Filter[] = [];
  filters3.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(true, "CONF"),
    ])!,
    FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
      generateFilterValue(false, "L1"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters3, nodes),
  ).toStrictEqual([node4]);
});

test("Multiple of each type", () => {
  const filters1: Filter[] = [];
  filters1.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(true, "HALL"),
      generateFilterValue(true, "CONF"),
      generateFilterValue(true, "ELEV"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters1, nodes),
  ).toStrictEqual([]);

  const filters2: Filter[] = [];
  filters2.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(true, "CONF"),
      generateFilterValue(true, "ELEV"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters2, nodes),
  ).toStrictEqual([node1]);

  const filters3: Filter[] = [];
  filters3.push(
    FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
      generateFilterValue(false, "HALL"),
      generateFilterValue(false, "ELEV"),
    ])!,
  );

  expect(
    FilterManager.getInstance().applyFilters(filters3, nodes),
  ).toStrictEqual([node1, node4]);
});
