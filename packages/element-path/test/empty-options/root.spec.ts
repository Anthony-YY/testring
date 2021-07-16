import {expect} from 'chai';
import {createElementPath} from '../../src';
import {
    getDescriptor,
    getPrivateDescriptor,
    checkAccessMethods,
    checkPreventExtensions,
    checkProperty,
} from '../utils';

describe('empty options ElementPath root', () => {
    const empty = createElementPath();

    describe('basic Object methods', () => {
        it('.toString()', () => {
            expect(empty.toString()).to.be.equal(
                "(//*[@data-test-automation-id='root'])[1]",
            );
        });

        it('to string converting', () => {
            expect(`${empty}`).to.be.equal(
                "(//*[@data-test-automation-id='root'])[1]",
            );
        });

        it('.toString(true)', () => {
            expect(empty.toString(true)).to.be.equal(
                "//*[@data-test-automation-id='root']",
            );
        });

        checkAccessMethods(empty);
    });

    describe('preventExtensions traps', () => {
        checkPreventExtensions(empty);
    });

    // Enum Property check
    describe('.__path property traps', () => {
        checkProperty({
            object: empty,
            key: '__path',
            valueDescriptor: getDescriptor([
                {
                    isRoot: true,
                    name: 'root',
                    xpath: "//*[@data-test-automation-id='root']",
                },
            ]),
        });
    });
    describe('.__flows property traps', () => {
        checkProperty({
            object: empty,
            key: '__flows',
            valueDescriptor: getDescriptor({}),
        });
    });

    // Private property check
    describe('.__searchOptions property traps', () => {
        checkProperty({
            object: empty,
            key: '__searchOptions',
            valueDescriptor: getPrivateDescriptor({
                exactKey: 'root',
            }),
        });
    });
    describe('.__parentPath property traps', () => {
        checkProperty({
            object: empty,
            key: '__parentPath',
            valueDescriptor: getPrivateDescriptor(null),
        });
    });

    describe('.__getReversedChain() call', () => {
        it('with root', () => {
            expect(empty.__getReversedChain()).to.be.equal('root');
        });
        it('without root', () => {
            expect(empty.__getReversedChain(false)).to.be.equal('');
        });
    });

    describe('.__getChildType() call', () => {
        it('return type check', () => {
            expect(empty.__getChildType()).to.be.a('string');
        });
        it('return value check', () => {
            expect(empty.__getChildType()).to.be.equal('root');
        });
    });
});
