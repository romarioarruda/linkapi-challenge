import { xml2js } from 'xml-js'

export default function convertXmlToJson(xml: string) {
  return xml2js(xml, { compact: true })
}
