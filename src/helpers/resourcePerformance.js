export function timeResource(resource) {
  if (!performance) return null;

  const performanceResourceEntries = performance.getEntriesByType("resource");
  const resourceTimings = [];

  for (const index in performanceResourceEntries) {
    const entry = performanceResourceEntries[index];

    if (entry.name.includes(resource)) {
      resourceTimings.push(Math.ceil(entry.duration));
    }
  }

  const resourceTimingsAverage = resourceTimings.length
    ? resourceTimings.reduce((a, b) => a + b, 0) / resourceTimings.length
    : null;

  // const resourceTimingsMax = Math.max(...resourceTimings);
  return resourceTimingsAverage;
}
