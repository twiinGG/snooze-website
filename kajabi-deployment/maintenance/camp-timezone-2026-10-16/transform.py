"""Apply the reviewed timezone-only substitutions to a fresh Kajabi settings payload.

Keep raw input/output outside Git because settings can contain embedded tokens.
Usage: python transform.py input.json output.json
"""
import json
import sys

SUFFIX = "(new Intl.DateTimeFormat('en', { timeZone: 'Australia/Melbourne', timeZoneName: 'shortOffset' }).formatToParts(new Date(value)).some(function (part) { return part.type === 'timeZoneName' && part.value === 'GMT+11'; }) ? ' AEDT / UTC+11' : ' AEST / UTC+10')"


def transform(value):
    if isinstance(value, dict):
        return {key: transform(item) for key, item in value.items()}
    if isinstance(value, list):
        return [transform(item) for item in value]
    if not isinstance(value, str):
        return value
    return (value.replace("timeZone: 'Etc/GMT-10'", "timeZone: 'Australia/Melbourne'")
            .replace("' AEST'", SUFFIX)
            .replace('10-11am AEST', '10-11am AEDT / UTC+11')
            .replace('10-11am AEDT)', '10-11am AEDT / UTC+11)')
            .replace('10-11am AEDT,', '10-11am AEDT / UTC+11,')
            .replace('the Thursday before camp, 11:59pm AEST', 'See the live booking deadline'))


if __name__ == '__main__':
    with open(sys.argv[1]) as source:
        original = json.load(source)
    with open(sys.argv[2], 'w') as target:
        json.dump(transform(original), target, indent=2)
        target.write('\n')
